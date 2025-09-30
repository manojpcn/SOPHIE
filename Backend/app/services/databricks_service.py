import httpx
import asyncio
from app.core.config import settings

async def run_saved_query(query_id: str):
    headers = {
        "Authorization": f"Bearer {settings.DATABRICKS_PAT}"
    }

    # Step 1: Fetch the saved query SQL
    query_url = f"{settings.DATABRICKS_HOST}/api/2.0/sql/queries/{query_id}"
    async with httpx.AsyncClient(timeout=30.0) as client:
        query_resp = await client.get(query_url, headers=headers)
        query_resp.raise_for_status()
        query_data = query_resp.json()
        sql_text = query_data["query_text"]

    # Step 2: Execute the query
    exec_url = f"{settings.DATABRICKS_HOST}/api/2.0/sql/statements"
    payload = {
        "statement": sql_text,
        "warehouse_id": settings.DATABRICKS_WAREHOUSE_ID,
        "wait_timeout": "30s",
        "disposition": "INLINE"
    }

    async with httpx.AsyncClient(timeout=30.0) as client:
        exec_resp = await client.post(exec_url, headers=headers, json=payload)
        exec_resp.raise_for_status()
        exec_data = exec_resp.json()

    statement_id = exec_data["statement_id"]

    # Step 3: Poll until completion with include_schema=true
    result_url = f"{settings.DATABRICKS_HOST}/api/2.0/sql/statements/{statement_id}?include_schema=true"
    while True:
        async with httpx.AsyncClient(timeout=30.0) as client:
            result_resp = await client.get(result_url, headers=headers)
            result_resp.raise_for_status()
            result_data = result_resp.json()

        state = result_data["status"]["state"]
        if state == "SUCCEEDED":
            schema = [col["name"] for col in result_data["manifest"]["schema"]["columns"]]
            rows = result_data["result"]["data_array"]

            # Map rows with schema names
            mapped_rows = [dict(zip(schema, row)) for row in rows]

            return {
                "success": True,
                # "columns": schema,
                "rows": mapped_rows
            }

        elif state in ("FAILED", "CANCELED"):
            raise Exception(f"Query failed: {result_data}")

        await asyncio.sleep(2)

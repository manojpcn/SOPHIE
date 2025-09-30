from fastapi import APIRouter
from app.services.databricks_service import run_saved_query
import logging

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

router = APIRouter(prefix="/dashboard", tags=["Dashboard"])

@router.get("/")
async def get_dashboard_data(query_id: str):
    logger.info(f"Dashboard endpoint called with query_id={query_id}")
    try:
        result = await run_saved_query(query_id)
        return {"success": True, "data": result}
    except Exception as e:
        logger.exception("Error fetching dashboard data")
        return {"success": False, "error": str(e)}

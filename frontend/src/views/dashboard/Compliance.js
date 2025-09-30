import React, { useState, useEffect } from 'react'
// import classNames from 'classnames'
import axios from 'axios'
import { Bar, Chart } from 'react-chartjs-2'
import { SankeyController, Flow } from 'chartjs-chart-sankey'
import { MatrixController, MatrixElement } from 'chartjs-chart-matrix'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'

import {
  CChartBar,
  CChartDoughnut,
  CChartLine,
  CChartPie,
  CChartPolarArea,
  CChartRadar,
} from '@coreui/react-chartjs'

import {
  CAvatar,
  CButton,
  CButtonGroup,
  CCard,
  CCardBody,
  CCardFooter,
  CCardHeader,
  CCol,
  CProgress,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CWidgetStatsA,
  CCardTitle,
  CCardText,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import {
  cibCcAmex,
  cibCcApplePay,
  cibCcMastercard,
  cibCcPaypal,
  cibCcStripe,
  cibCcVisa,
  cibGoogle,
  cibFacebook,
  cibLinkedin,
  cifBr,
  cifEs,
  cifFr,
  cifIn,
  cifPl,
  cifUs,
  cibTwitter,
  cilCloudDownload,
  cilPeople,
  cilUser,
  cilUserFemale,
} from '@coreui/icons'

import avatar1 from 'src/assets/images/avatars/1.jpg'
import avatar2 from 'src/assets/images/avatars/2.jpg'
import avatar3 from 'src/assets/images/avatars/3.jpg'
import avatar4 from 'src/assets/images/avatars/4.jpg'
import avatar5 from 'src/assets/images/avatars/5.jpg'
import avatar6 from 'src/assets/images/avatars/6.jpg'

import WidgetsBrand from '../widgets/WidgetsBrand'
import WidgetsDropdown from '../widgets/WidgetsDropdown'
import MainChart from './MainChart'
// import { from } from 'core-js/core/array'

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
  SankeyController,
  Flow,
  MatrixController,
  MatrixElement,
)

const Compliance = () => {
  const [chartData, setChartData] = useState([])
  const [campaignPerformanceData, setCampaignPerformanceData] = useState(null)
  const [frameWorkBaseLineCoverageData, setFrameWorkBaseLineCoverageData] = useState(null)
  const [accessAttestationCampaignManagment, setAccessAttestationCampaignManagment] = useState(null)
  const [auditReadinessData, setAuditReadinessData] = useState(null)
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)

  const getChartData = async () => {
    try {
      const response = await axios.get(
        'http://localhost:5050/dashboard/?query_id=1de3fc8c-83dc-46dc-b1eb-9b68156eae2f',
      )
      setChartData(response.data.data.rows)
    } catch (e) {
      console.log(e)
    } finally {
      setLoading(false)
    }
  }

  const getComplianceFrameWorkData = async () => {
    try {
      const response = await axios.get(
        'http://localhost:5050/dashboard/?query_id=51d61126-a577-4a31-8cfb-f4a559ec84a9',
      )
      const rows = response.data.data.rows

      const labels = rows.map((r) => r.framework_name.replace(/_/g, ' '))
      // console.log(labels)

      const avgAttestation = rows.map((r) => Number(r.avg_attestation_completion))
      const highRiskBaselines = rows.map((r) => Number(r.high_risk_baselines))
      const requiredBaselines = rows.map((r) => Number(r.required_baselines))
      const recommendedBaselines = rows.map((r) => Number(r.recommended_baselines))

      setData(rows)

      setCampaignPerformanceData({
        labels,
        datasets: [
          {
            type: 'bar',
            label: 'Avg Attestation Completion',
            data: avgAttestation,
            backgroundColor: '#D8EAFF',
            yAxisID: 'y',
          },
          {
            type: 'line',
            label: 'High Risk Baselines',
            data: highRiskBaselines,
            borderColor: '#FEC2BC',
            borderWidth: 2,
            fill: false,
            tension: 0.3,
            yAxisID: 'y1',
          },
        ],
      })
      setFrameWorkBaseLineCoverageData({
        labels,
        datasets: [
          {
            label: 'Recommended Baselines',
            backgroundColor: '#FEC2BC',
            data: recommendedBaselines,
          },
          {
            label: 'Required Baselines',
            backgroundColor: '#D8EAFF',
            data: requiredBaselines,
          },
        ],
      })
    } catch (e) {
      console.log(e)
    } finally {
      setLoading(false)
    }
  }

  const getAccessAttestationCampaignManagementData = async () => {
    try {
      const response = await axios.get(
        'http://localhost:5050/dashboard/?query_id=606cdc86-1015-4956-8730-e40ba5ef4ec2',
      )
      const rows = response.data.data.rows

      const groupedData = rows.reduce((acc, row) => {
        const framework = row.compliance_framework.replace(/_/g, ' ')
        acc[framework] = (acc[framework] || 0) + 1
        return acc
      }, {})

      const labels = Object.keys(groupedData)
      const counts = Object.values(groupedData)
      // console.log(labels)

      setAccessAttestationCampaignManagment({
        labels,
        datasets: [
          {
            type: 'bar',
            label: 'Urgency Status Count',
            backgroundColor: '#FEC2BC',
            data: counts,
          },
        ],
      })
    } catch (e) {
      console.log(e)
    } finally {
      setLoading(false)
    }
  }

  const getAuditReadinessData = async () => {
    try {
      const response = await axios.get(
        'http://localhost:5050/dashboard/?query_id=22284f29-1315-4923-9e26-482edf95a123',
      )
      const rows = response.data.data.rows

      const links = rows
        .filter((r) => r.evidence_category && r.satisfactory_evidence_rate)
        .map((r) => ({
          from: String(r.evidence_category.replace(/_/g, ' ')),
          to: String(r.satisfactory_evidence_rate.replace(/_/g, ' ')),
          flow: Number(r.evidence_current_rate || 0),
        }))

      setAuditReadinessData({
        datasets: [
          {
            label: 'Evidence Flow',
            data: links, // ✅ correct: use the array, not a string
            colorFrom: 'green',
            colorTo: 'blue',
            colorMode: 'gradient',
            size: 'max',
          },
        ],
      })
    } catch (e) {
      console.log(e)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    getChartData()
    getComplianceFrameWorkData()
    getAuditReadinessData()
    getAccessAttestationCampaignManagementData()
  }, [])

  const columns = [
    {
      key: 'id',
      label: 'Sl No',
      _props: { scope: 'col' },
    },
    {
      key: 'framework_name',
      label: 'Framework Name',
      _props: { scope: 'col' },
    },
    {
      key: 'framework_version',
      label: 'Framework Version',
      _props: { scope: 'col' },
    },
    {
      key: 'required_baselines',
      label: 'Required Baselines',
      _props: { scope: 'col' },
    },
    {
      key: 'recommended_baselines',
      label: 'Recommended Baselines',
      _props: { scope: 'col' },
    },
    // {
    //   key: 'avg_effectiveness_score',
    //   label: 'Avg Effectiveness Score',
    //   _props: { scope: 'col' },
    // },
  ]

  const items = data.map((row, index) => ({
    id: index + 1,
    framework_name: row.framework_name?.replace(/_/g, ' ') || '',
    framework_version: row.framework_version || '',
    required_baselines: row.required_baselines || '',
    recommended_baselines: row.recommended_baselines || '',
    // avg_effectiveness_score: row.avg_effectiveness_score || '',
    _cellProps: { id: { scope: 'row' } },
  }))
  return (
    <>
      <CRow>
        <CCol>
          <CCard className="mb-4">
            <div className="card-header">
              <h6 id="traffic" className="card-title mb-0">
                Regulatory Incident Impact & Reporting
              </h6>
            </div>
          </CCard>
        </CCol>
      </CRow>
      <CRow className="mb-4" xs={{ gutter: 4 }}>
        <CCol sm={6} xl={4} xxl={3} className="card-ttl">
          <CWidgetStatsA
            value="Regulatory Reporting Compliance Rate"
            title={
              <>
                {chartData.length > 0
                  ? chartData[0].regulatory_reporting_compliance_rate_pct
                  : 'N/A'}
                %
              </>
            }
            color="primary"
          />
        </CCol>
        <CCol sm={6} xl={4} xxl={3} className="card-ttl">
          <CWidgetStatsA
            color="primary"
            value="Incident-to-Report Ratio"
            title={<>{chartData.length > 0 ? chartData[0].incident_to_report_ratio_pct : 'N/A'}%</>}
          />
        </CCol>
        <CCol sm={6} xl={4} xxl={3} className="card-ttl">
          <CWidgetStatsA
            color="primary"
            value="Investigation Closure Efficiency in Days"
            title={
              <>
                {chartData.length > 0 ? chartData[0].investigation_closure_efficiency_days : 'N/A'}
              </>
            }
          />
        </CCol>
      </CRow>
      <CRow className="mb-4" xs={{ gutter: 4 }}>
        <CCol sm={6} xl={4} xxl={3} className="card-ttl">
          <CWidgetStatsA
            color="primary"
            value="Containment Success Rate"
            title={<>{chartData.length > 0 ? chartData[0].containment_success_rate_pct : 'N/A'}%</>}
          />
        </CCol>
        <CCol sm={6} xl={4} xxl={3} className="card-ttl">
          <CWidgetStatsA
            color="primary"
            value="Multi-Framework Impact Rate"
            title={
              <>{chartData.length > 0 ? chartData[0].multi_framework_impact_rate_pct : 'N/A'}%</>
            }
          />
        </CCol>
      </CRow>
      <CRow>
        <CCol>
          <CCard className="mb-4">
            <div className="card-header">
              <h4 id="traffic" className="card-title mb-0">
                Compliance Framework Coverage & Readiness
              </h4>
            </div>
          </CCard>
        </CCol>
      </CRow>
      <CRow>
        <CCol xs={6}>
          <CCard className="mb-4">
            <CCardHeader>Attestation campaign performance</CCardHeader>
            {/* <pre>{JSON.stringify(chartData, null, 2)}</pre> */}
            <CCardBody>
              <CChartBar
                data={campaignPerformanceData}
                options={{
                  responsive: true,
                  interaction: { mode: 'index', intersect: false },
                  stacked: false,
                  plugins: { legend: { position: 'bottom' } },
                  scales: {
                    x: {
                      title: {
                        display: true,
                        text: 'Framework',
                      },
                    },
                    y: {
                      type: 'linear',
                      display: true,
                      position: 'left',
                      title: { display: true, text: 'Completion (%)' },
                    },
                    y1: {
                      type: 'linear',
                      display: false,
                      position: 'right',
                      grid: { drawOnChartArea: false },
                      title: { display: false, text: 'Risk Count' },
                    },
                  },
                }}
              />
            </CCardBody>
          </CCard>
        </CCol>
        <CCol xs={6}>
          <CCard className="mb-4">
            <CCardHeader>Framework baseline coverage (required vs recommended)</CCardHeader>
            <CCardBody>
              <CChartBar
                data={frameWorkBaseLineCoverageData}
                options={{
                  responsive: true,
                  plugins: {
                    legend: { position: 'bottom' },
                    title: { display: false },
                  },
                  datalabels: {
                    color: '#000',
                    anchor: 'end',
                    align: 'end',
                    formatter: (value) => value, // show count directly
                  },
                  scales: {
                    x: {
                      title: {
                        display: true,
                        text: 'Framework',
                      },
                    },
                    y: {
                      title: {
                        display: true,
                        text: 'Total Baselines',
                      },
                      beginAtZero: true,
                    },
                  },
                }}
              />
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
      <CTable columns={columns} items={items} />
      <CRow>
        <CCol>
          <CCard className="mb-4">
            <div className="card-header">
              <h4 id="traffic" className="card-title mb-0">
                Access Attestation Campaign Management
              </h4>
            </div>
          </CCard>
        </CCol>
      </CRow>
      <CRow>
        <CCol xs={12}>
          <CCard className="mb-4">
            <CCardHeader>Campaign Status Overview</CCardHeader>
            {/* <pre>{JSON.stringify(chartData, null, 2)}</pre> */}
            <CCardBody>
              <CChartBar
                data={accessAttestationCampaignManagment}
                options={{
                  responsive: true,
                  plugins: {
                    legend: { position: 'bottom' },
                    title: { display: false, text: 'Risks by Business Unit' },
                  },
                  datalabels: {
                    color: '#000',
                    anchor: 'end',
                    align: 'end',
                    formatter: (value) => value, // show count directly
                  },
                  scales: {
                    x: {
                      title: {
                        display: true,
                        text: 'Compliance FrameWork',
                      },
                    },
                    y: {
                      title: {
                        display: true,
                        text: 'Count Of Urgency Status',
                      },
                      beginAtZero: true,
                    },
                  },
                }}
              />
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
      <CRow>
        <CCol>
          <CCard className="mb-4">
            <div className="card-header">
              <h4 id="traffic" className="card-title mb-0">
                Audit Readiness & Evidence Completeness
              </h4>
            </div>
          </CCard>
        </CCol>
      </CRow>
      <CRow>
        <CCol xs={12}>
          <CCard className="mb-4">
            <CCardHeader>
              Control Effectiveness: 100% current with 83% satisfactory (audit ready)
            </CCardHeader>
            {/* <pre>{JSON.stringify(chartData, null, 2)}</pre> */}
            <CCardBody>
              {auditReadinessData && (
                <Chart
                  type="sankey"
                  data={auditReadinessData}
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    layout: { padding: 20 }, // Add space around nodes
                    plugins: {
                      tooltip: {
                        callbacks: {
                          label: (ctx) => {
                            const { from, to, flow } = ctx.raw
                            return [`From: ${from}`, `To: ${to}`, `Evidence Rate: ${flow}`]
                          },
                        },
                      },
                      title: {
                        display: true,
                        text: 'Evidence Category → Satisfactory Rate Flow',
                        font: { size: 16 },
                      },
                      legend: { display: false }, // Optional: hide legend if unnecessary
                    },
                    // Node spacing & appearance
                    sankey: {
                      node: {
                        width: 20,
                        padding: 100, // Space between nodes
                        ratio: 10,
                        label: {
                          font: { size: 12 },
                          color: '#333',
                          rotate: 0, // default is 0, can try 45 for long labels
                          align: 'start',
                        },
                      },
                      link: {
                        borderWidth: 10,
                        innerHeight: 20,
                      },
                    },
                  }}
                />
              )}
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </>
  )
}

export default Compliance

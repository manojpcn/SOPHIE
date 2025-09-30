import React, { useState, useEffect } from 'react'
import classNames from 'classnames'
import axios from 'axios'
import {
  CChartBar,
  CChartDoughnut,
  CChartLine,
  CChartPie,
  CChartPolarArea,
  CChartRadar,
} from '@coreui/react-chartjs'
import { Chart } from 'react-chartjs-2'
import { Chart as ChartJS } from 'chart.js'
import { MatrixController, MatrixElement } from 'chartjs-chart-matrix'
import annotationPlugin from 'chartjs-plugin-annotation'

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
ChartJS.register(MatrixController, MatrixElement, annotationPlugin)
const Risks = () => {
  const [chartData, setChartData] = useState(null)
  const [riskTrending, setRiskTrending] = useState(null)
  const [enterpriseRiskHeatMap, setEnterpriseRiskHeatMap] = useState([])
  const [loading, setLoading] = useState(true)

  const getEnterpriseRiskQuadrantMap = async () => {
    try {
      const response = await axios.get(
        'http://localhost:5050/dashboard/?query_id=57c79566-eb5e-432e-b542-4e739bae32bb',
      )
      const rows = response.data.data.rows

      const dataset = rows.map((r) => ({
        x: Number(r.avg_likelihood), // X-axis → Likelihood
        y: Number(r.avg_impact), // Y-axis → Impact
        r: Math.sqrt(Number(r.risk_count)) * 5, // Bubble size by risk count
        v: Number(r.total_financial_exposure), // Exposure value
        threat: Number(r.threat_actor_relevant_risks),
      }))

      setEnterpriseRiskHeatMap({
        type: 'bubble',
        data: {
          datasets: [
            {
              label: 'Risk Quadrant Map',
              data: dataset,
              backgroundColor: (ctx) => {
                const v = ctx.raw.v
                if (v > 1000000) return 'rgba(255,0,0,0.8)' // High exposure
                if (v > 500000) return 'rgba(255,165,0,0.8)' // Medium
                return 'rgba(0,128,0,0.8)' // Low
              },
            },
          ],
        },
        options: {
          plugins: {
            legend: { display: false },
            annotation: {
              annotations: {
                // Vertical line (Likelihood mid)
                xLine: {
                  type: 'line',
                  xMin: 5, // adjust midpoint based on your scale
                  xMax: 5,
                  borderColor: 'black',
                  borderWidth: 2,
                },
                // Horizontal line (Impact mid)
                yLine: {
                  type: 'line',
                  yMin: 5, // adjust midpoint based on your scale
                  yMax: 5,
                  borderColor: 'black',
                  borderWidth: 2,
                },
              },
            },
          },
          scales: {
            x: {
              title: { display: true, text: 'Likelihood' },
              min: 0,
              max: 10,
            },
            y: {
              title: { display: true, text: 'Impact' },
              min: 0,
              max: 10,
            },
          },
        },
      })
    } catch (e) {
      console.log(e)
    } finally {
      setLoading(false)
    }
  }

  const getChartData = async () => {
    try {
      const response = await axios.get(
        'http://localhost:5050/dashboard/?query_id=06aff181-e1ec-40ac-b402-3f9ff2bf7c4b',
      )

      const rows = response.data.data.rows

      const labels = rows.map((r) => r.business_unit)

      const highRisks = rows.map((r) => Number(r.high_risks))
      const criticalRisks = rows.map((r) => Number(r.critical_risks))
      const mediumRisks = rows.map((r) => Number(r.medium_risks))
      const lowRisks = rows.map((r) => Number(r.low_risks))
      const totalRisks = rows.map((r) => Number(r.total_risks_by_bu))

      setChartData({
        labels,
        datasets: [
          {
            label: 'Critical',
            backgroundColor: '#FEC2BC',
            data: criticalRisks,
          },
          {
            label: 'High',
            backgroundColor: '#D8EAFF',
            data: highRisks,
          },
          {
            label: 'Medium',
            backgroundColor: '#426785',
            data: mediumRisks,
          },
          {
            label: 'Low',
            backgroundColor: '#79A197',
            data: lowRisks,
          },
        ],
      })
      setRiskTrending({
        labels,
        datasets: [
          {
            label: '',
            backgroundColor: 'rgba(220, 220, 220, 0.2)',
            borderColor: '#79A197',
            pointBackgroundColor: 'rgba(220, 220, 220, 1)',
            pointBorderColor: '#79A197',
            data: totalRisks,
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
    getEnterpriseRiskQuadrantMap()
  }, [])

  return (
    <>
      <CRow>
        <CCol>
          <CCard className="mb-4">
            <div className="card-header">
              <h4 id="traffic" className="card-title mb-0">
                Enterprise Risk Posture by Business Unit
              </h4>
            </div>
          </CCard>
        </CCol>
      </CRow>
      <CRow>
        <CCol xs={6}>
          <CCard className="mb-4">
            <CCardHeader>Risk distribution by severity (Critical, High, Medium, Low)</CCardHeader>
            {/* <pre>{JSON.stringify(chartData, null, 2)}</pre> */}
            <CCardBody>
              <CChartBar
                data={chartData}
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
                        text: 'Business Unit',
                      },
                    },
                    y: {
                      title: {
                        display: true,
                        text: 'Risk Count',
                      },
                      beginAtZero: true,
                    },
                  },
                }}
              />
            </CCardBody>
          </CCard>
        </CCol>
        <CCol xs={6}>
          <CCard className="mb-4">
            <CCardHeader>30-day risk trending</CCardHeader>
            <CCardBody>
              <CChartLine
                data={riskTrending}
                options={{
                  responsive: true,
                  plugins: {
                    display: false,
                    // legend: { position: 'bottom' },
                    // title: { display: false, text: 'Risks by Business Unit' },
                  },
                  scales: {
                    x: {
                      title: {
                        display: true,
                        text: 'Business Unit',
                      },
                    },
                    y: {
                      title: {
                        display: true,
                        text: 'Total Risks by Business Unit',
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
                Enterprise Risk Heat Map & Distribution
              </h4>
            </div>
          </CCard>
        </CCol>
      </CRow>
      <CRow>
        <CCol xs={12}>
          <CCard className="mb-4">
            <CCardHeader>Regulatory and threat active correlation</CCardHeader>
            {/* <pre>{JSON.stringify(chartData, null, 2)}</pre> */}
            <CCardBody>
              {enterpriseRiskHeatMap && (
                <Chart
                  type="bubble" // ✅ use bubble instead of matrix
                  data={enterpriseRiskHeatMap}
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    scales: {
                      x: {
                        type: 'linear',
                        min: 0,
                        max: 10,
                        title: { display: true, text: 'Avg Likelihood' },
                      },
                      y: {
                        type: 'linear',
                        min: 0,
                        max: 10,
                        title: { display: true, text: 'Avg Impact' },
                      },
                    },
                    plugins: {
                      tooltip: {
                        callbacks: {
                          title: () => '',
                          label: (ctx) => {
                            const { x, y, v, riskCount, threat } = ctx.raw
                            return [
                              `Likelihood: ${x}`,
                              `Impact: ${y}`,
                              `Exposure: ${v}`,
                              `Risk Count: ${riskCount}`,
                              `Threat Actor Risks: ${threat}`,
                            ]
                          },
                        },
                      },
                      legend: { display: false },
                      annotation: {
                        annotations: {
                          xLine: {
                            type: 'line',
                            xMin: 5, // midpoint for Likelihood
                            xMax: 5,
                            borderColor: 'black',
                            borderWidth: 2,
                          },
                          yLine: {
                            type: 'line',
                            yMin: 5, // midpoint for Impact
                            yMax: 5,
                            borderColor: 'black',
                            borderWidth: 2,
                          },
                        },
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

export default Risks

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

const Security = () => {
  const [chartData, setChartData] = useState(null)
  const [riskTrending, setRiskTrending] = useState(null)
  const [loading, setLoading] = useState(true)

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
  }, [])

  return (
    <>
      <CRow>
        <CCol>
          <CCard className="mb-4">
            <div className="card-header">
              <h4 id="traffic" className="card-title mb-0">
                Security Event Risk Correlation
              </h4>
            </div>
          </CCard>
        </CCol>
      </CRow>
      <CRow className="mb-4" xs={{ gutter: 4 }}>
        <CCol sm={6} xl={4} xxl={3}>
          <CWidgetStatsA color="primary" title="Users" />
        </CCol>
        <CCol sm={6} xl={4} xxl={3}>
          <CWidgetStatsA color="primary" title="Users" />
        </CCol>
        <CCol sm={6} xl={4} xxl={3}>
          <CWidgetStatsA color="primary" title="Users" />
        </CCol>
      </CRow>
      <CRow>
        <CCol>
          <CCard className="mb-4">
            <div className="card-header">
              <h4 id="traffic" className="card-title mb-0">
                Control Reality Assessment
              </h4>
            </div>
          </CCard>
        </CCol>
      </CRow>
      <CRow className="mb-4" xs={{ gutter: 4 }}>
        <CCol sm={6} xl={4} xxl={3}>
          <CWidgetStatsA color="primary" title="Users" />
        </CCol>
        <CCol sm={6} xl={4} xxl={3}>
          <CWidgetStatsA color="primary" title="Users" />
        </CCol>
        <CCol sm={6} xl={4} xxl={3}>
          <CWidgetStatsA color="primary" title="Users" />
        </CCol>
      </CRow>
      <CRow>
        <CCol></CCol>
      </CRow>
      <CRow>
        <CCol>
          <CCard className="mb-4">
            <div className="card-header">
              <h4 id="traffic" className="card-title mb-0">
                Security Control Performance & Effectiveness
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
      </CRow>
    </>
  )
}

export default Security

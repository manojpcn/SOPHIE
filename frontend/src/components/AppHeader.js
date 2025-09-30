import React, { useEffect, useRef, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import {
  CContainer,
  CDropdown,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
  CHeader,
  CHeaderNav,
  CHeaderToggler,
  CNavLink,
  CNavItem,
  useColorModes,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import {
  cilBell,
  cilContrast,
  cilEnvelopeOpen,
  cilList,
  cilMenu,
  cilMoon,
  cilSun,
} from '@coreui/icons'

import { AskSohpieBtn } from 'src/assets/images/svgs/AskSohpieBtn'

import { AppBreadcrumb } from './index'
import { AppHeaderDropdown } from './header/index'

const AppHeader = () => {
  const headerRef = useRef()
  const { colorMode, setColorMode } = useColorModes('coreui-free-react-admin-template-theme')

  const dispatch = useDispatch()
  const sidebarShow = useSelector((state) => state.sidebarShow)

  useEffect(() => {
    document.addEventListener('scroll', () => {
      headerRef.current &&
        headerRef.current.classList.toggle('shadow-sm', document.documentElement.scrollTop > 0)
    })
  }, [])

  const [formattedDate, setFormattedDate] = useState('')

  useEffect(() => {
    const updateDate = () => {
      const now = new Date()
      const formatted = new Intl.DateTimeFormat('en-US', {
        weekday: 'short', // Tue
        month: 'short', // Sep
        day: 'numeric', // 9
        year: 'numeric', // 2025
      }).format(now)
      setFormattedDate(formatted)
    }

    updateDate() // Initial call
    const interval = setInterval(updateDate, 60000) // Update every 1 min

    return () => clearInterval(interval) // Cleanup on unmount
  }, [])

  return (
    <>
      <CHeader position="sticky" className="mb-0 p-0" ref={headerRef}>
        <CContainer className="border-bottom px-4" fluid>
          <CHeaderToggler
            onClick={() => dispatch({ type: 'set', sidebarShow: !sidebarShow })}
            style={{ marginInlineStart: '-14px' }}
          >
            <CIcon icon={cilMenu} size="lg" />
          </CHeaderToggler>
          <h3 className="product-name mb-0">Sohpie</h3>
          {/* <CHeaderNav className="d-none d-md-flex">
          <CNavItem>
            <CNavLink to="/watchlist" as={NavLink}>
              Watchlist
            </CNavLink>
          </CNavItem>
          <CNavItem>
            <CNavLink href="#">Users</CNavLink>
          </CNavItem>
          <CNavItem>
            <CNavLink href="#">Settings</CNavLink>
          </CNavItem>
        </CHeaderNav>
        <CHeaderNav className="ms-auto">
          <CNavItem>
            <CNavLink href="#">
              <CIcon icon={cilBell} size="lg" />
            </CNavLink>
          </CNavItem>
          <CNavItem>
            <CNavLink href="#">
              <CIcon icon={cilList} size="lg" />
            </CNavLink>
          </CNavItem>
          <CNavItem>
            <CNavLink href="#">
              <CIcon icon={cilEnvelopeOpen} size="lg" />
            </CNavLink>
          </CNavItem>
        </CHeaderNav> */}

          <CHeaderNav className="d-none d-md-flex ms-auto">
            <button
              type="button"
              className="me-3"
              style={{
                display: 'inline-block',
                width: 120,
                height: 40,
                border: 'none',
                background: 'transparent',
                padding: 0,
                cursor: 'pointer',
              }}
              dangerouslySetInnerHTML={{ __html: AskSohpieBtn }}
            />
          </CHeaderNav>
          <CHeaderNav>
            <CDropdown variant="nav-item" placement="bottom-end">
              {/* <CDropdownToggle caret={false}>
              {colorMode === 'dark' ? (
                <CIcon icon={cilMoon} size="lg" />
              ) : colorMode === 'auto' ? (
                <CIcon icon={cilContrast} size="lg" />
              ) : (
                <CIcon icon={cilSun} size="lg" />
              )}
            </CDropdownToggle> */}
              <CDropdownMenu>
                <CDropdownItem
                  active={colorMode === 'light'}
                  className="d-flex align-items-center"
                  as="button"
                  type="button"
                  onClick={() => setColorMode('light')}
                >
                  <CIcon className="me-2" icon={cilSun} size="lg" /> Light
                </CDropdownItem>
                <CDropdownItem
                  active={colorMode === 'dark'}
                  className="d-flex align-items-center"
                  as="button"
                  type="button"
                  onClick={() => setColorMode('dark')}
                >
                  <CIcon className="me-2" icon={cilMoon} size="lg" /> Dark
                </CDropdownItem>
                <CDropdownItem
                  active={colorMode === 'auto'}
                  className="d-flex align-items-center"
                  as="button"
                  type="button"
                  onClick={() => setColorMode('auto')}
                >
                  <CIcon className="me-2" icon={cilContrast} size="lg" /> Auto
                </CDropdownItem>
              </CDropdownMenu>
            </CDropdown>
            <AppHeaderDropdown />
          </CHeaderNav>
        </CContainer>
        {/* <CContainer className="px-4" fluid>
        <AppBreadcrumb />
      </CContainer> */}
      </CHeader>
      <header className="sub-header position-sticky mb-4">
        <CContainer className="border-bottom px-4" fluid>
          <div className="row py-2">
            <div className="col-md-6 col-12">
              <h4 className="mb-0">Governance Risk & Compliance</h4>
            </div>
            <div className="col-md-6 col-12 d-flex justify-content-md-end mt-2 mt-md-0">
              <span>{formattedDate}</span>
            </div>
          </div>
        </CContainer>
      </header>
    </>
  )
}

export default AppHeader

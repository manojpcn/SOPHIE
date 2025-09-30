import React from 'react'
import CIcon from '@coreui/icons-react'
import {
  cilBell,
  cilCalculator,
  cilChartPie,
  cilCursor,
  cilDescription,
  cilDrop,
  cilExternalLink,
  cilNotes,
  cilPencil,
  cilLayers,
  cilPuzzle,
  cilSpeedometer,
  cilStar,
} from '@coreui/icons'
import { CNavGroup, CNavItem, CNavTitle } from '@coreui/react'

import {
  AgentLibrary,
  Hub,
  Insights,
  Feedback,
  Watchlist,
} from 'src/views/icons/sidebar/SidebarIcons'

const _nav = [
  {
    component: CNavTitle,
    name: 'Theme',
  },
  {
    component: CNavItem,
    name: 'Watchlist',
    to: '/watchlist',
    icon: (
      <span
        customClassName="nav-icon"
        className="sidebar-icon"
        style={{ display: 'inline-block', width: 28, height: 28 }}
        dangerouslySetInnerHTML={{ __html: Watchlist }}
      />
    ),
  },
  {
    component: CNavGroup,
    name: 'Hub',
    to: '/hub',
    icon: (
      <span
        customClassName="nav-icon"
        className="sidebar-icon"
        style={{ display: 'inline-block', width: 28, height: 28 }}
        dangerouslySetInnerHTML={{ __html: Hub }}
      />
    ),
    items: [
      {
        component: CNavItem,
        name: 'Risks',
        to: '/dashboard/risks',
      },
      {
        component: CNavItem,
        name: 'Compliance',
        to: '/dashboard/compliance',
      },
      {
        component: CNavItem,
        name: 'Security',
        to: '/dashboard/security',
      },
    ],
  },
  {
    component: CNavItem,
    name: 'Insights',
    to: '/insights',
    icon: (
      <span
        customClassName="nav-icon"
        className="sidebar-icon"
        style={{ display: 'inline-block', width: 28, height: 28 }}
        dangerouslySetInnerHTML={{ __html: Insights }}
      />
    ),
  },
  {
    component: CNavItem,
    name: 'Agent Library',
    to: '/agentLibrary',
    icon: (
      <span
        customClassName="nav-icon"
        className="sidebar-icon"
        style={{ display: 'inline-block', width: 28, height: 28 }}
        dangerouslySetInnerHTML={{ __html: AgentLibrary }}
      />
    ),
  },
  {
    component: CNavItem,
    name: 'Feedback',
    to: '/feedback',
    icon: (
      <span
        customClassName="nav-icon"
        className="sidebar-icon"
        style={{ display: 'inline-block', width: 28, height: 28 }}
        dangerouslySetInnerHTML={{ __html: Feedback }}
      />
    ),
  },
  {
    component: CNavItem,
    name: 'Ask Sophie',
    to: '/askSophie',
    icon: (
      <span
        customClassName="nav-icon"
        className="sidebar-icon"
        style={{ display: 'inline-block', width: 28, height: 28 }}
        dangerouslySetInnerHTML={{ __html: AgentLibrary }}
      />
    ),
  },
]

export default _nav

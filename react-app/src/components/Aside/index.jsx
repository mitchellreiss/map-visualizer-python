import { Sling as Hamburger } from 'hamburger-react'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import { toggleAside } from '../../store/ui'
import RouteList from '../Routes'
import Tabs from './Tabs'

const CHOICES = {
  WORKOUT: 'Workout',
  ROUTE: 'Route',
}

export default function Aside() {
  const [viewType, setViewType] = useState(CHOICES.ROUTE)
  const isAsideOpen = useSelector(({ ui }) => ui.aside)
  const dispatch = useDispatch()

  return (
    <AsideContainer isAsideOpen={isAsideOpen}>
      <span>
        <Tabs viewType={viewType} setViewType={setViewType} CHOICES={CHOICES} />
        <Hamburger
          toggle={() => dispatch(toggleAside())}
          toggled={isAsideOpen}
        />
      </span>
      {isAsideOpen ? viewType === CHOICES.WORKOUT ? null : <RouteList /> : null}
    </AsideContainer>
  )
}

const AsideContainer = styled.aside`
  width: ${({ isAsideOpen }) => (isAsideOpen ? '40rem' : '7rem')};
  height: calc(100vh - calc(var(--nav-height)));
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  border-right: 0.2rem solid var(--secondary-dark);
  transition: width 0.4s;

  span {
    display: flex;
    flex-direction: ${({ isAsideOpen }) =>
      isAsideOpen ? 'row' : 'column-reverse'};
    width: 100%;
    border-bottom: ${({ isAsideOpen }) =>
      isAsideOpen ? '0.3rem solid var(--primary-cyan)' : 'none'};
    transition: all 0.4s;
  }

  .hamburger-react {
    color: ${({ isAsideOpen }) => (isAsideOpen ? 'var(--primary-cyan)' : '')};
    margin-left: ${({ isAsideOpen }) => (isAsideOpen ? '4rem' : '1rem')};
    transition: all 0.4s;
  }
`

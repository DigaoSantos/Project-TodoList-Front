import React, {useState, useEffect} from 'react';
import * as S from './styles';

import {Link} from 'react-router-dom';

import logo from '../../assets/logo.png'
import bell from '../../assets/bell.png'

import api from '../../service/api'

function Header({ clickNotification }) {
  console.log('clickNotification', clickNotification)
  const [lateCount, setLateCount] = useState();

  async function lateVerify(){
    await api.get(`/task/filter/late/11:11:11:11:11:11`)
    .then(response => {
      setLateCount(response.data.length)
      console.log('xx', response.data.length)
    })
  }

  useEffect(() => {
    lateVerify()
  },[])

  return (
    <S.Container>
      <S.LeftSide>
        <img src={logo} alt="Logo" />
      </S.LeftSide>
      <S.RightSide>
        <Link to="/">INICIO</Link>
        <span className="dividir" />
        <Link to="/task">NOVA TAREFA</Link>
        <span className="dividir" />
        <Link to="/qrcode">SINCRONIZAR CELULAR</Link>
        {
          lateCount &&
          <>
        <span className="dividir" />
        <button href="#" id="notification" onClick={clickNotification}>
          <img src={bell} alt="notificacao" />
          <span>{lateCount}</span>
        </button>
          </>
        }
      </S.RightSide>
    </S.Container>

  )
}

export default Header;

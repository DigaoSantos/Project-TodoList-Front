import React, { useEffect, useState } from 'react';
import {Link} from 'react-router-dom'
import * as S from './styles';

import api from '../../service/api';

//
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import FilterCard from '../../components/FilterCard'
import TaskCard from '../../components/TaskCard'

function Home() {
  const [filterActived, setFilterActived] = useState('all');
  const [tasks, setTasks] = useState([]);


  async function loadTasks(){
    await api.get(`/task/filter/${filterActived}/11:11:11:11:11:11`)
    .then(response => {
      setTasks(response.data)
      console.log(response.data)
    })
  }

  function notification() {
    setFilterActived('late')
  }

  useEffect(() => {
    loadTasks();
  }, [filterActived])

  return (
    <S.Container>
      <Header clickNotification={notification}/>
        <S.FilterArea>
          <button type="button" onClick={() => setFilterActived('all')}>
            <FilterCard title="Todos" actived={filterActived == 'all'}/>
          </button>
          <button type="button" onClick={() => setFilterActived('today')}>
            <FilterCard title="Hoje" actived={filterActived == 'today'}/>
          </button>
          <button type="button" onClick={() => setFilterActived('week')}>
            <FilterCard title="Semana" actived={filterActived == 'week'}/>
          </button>
          <button type="button" onClick={() => setFilterActived('month')}>
            <FilterCard title="Mes" actived={filterActived == 'month'}/>
          </button>
          <button type="button" onClick={() => setFilterActived('year')}>
            <FilterCard title="Ano" actived={filterActived == 'year'}/>
          </button>
        </S.FilterArea>
        <S.Title>
          <h3>{filterActived == 'late' ? 'TAREFAS ATRASADAS' : 'TAREFAS'}</h3>
        </S.Title>
        <S.Content>
          {
            tasks.map(t => (
            <Link to={`/task/${t._id}`}>
              <TaskCard type={t.type} title={t.title} when={t.when} done={t.done} />
            </Link>
            ))
          }
        </S.Content>
      <Footer />
    </S.Container>
  )
}

export default Home;

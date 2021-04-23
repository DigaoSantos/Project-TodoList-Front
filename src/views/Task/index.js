import React, { useEffect, useState } from 'react';
import * as S from './styles';

import api from '../../service/api';

//
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import TypeIcons from '../../utils/typeIcons'

import iconCalendar from '../../assets/calendar.png'
import iconClock from '../../assets/clock.png'

function Task() {
  const [lateCount, setLateCount] = useState();
  const [type, setType] = useState();
  const [id, setId] = useState();
  const [done, setDone] = useState(false);
  const [title, setTitle] = useState();
  const [description, setDescription] = useState();
  const [date, setDate] = useState();
  const [hour, setHour] = useState();
  const [macaddress, setMacaddress] = useState('11:11:11:11:11:11');

  async function lateVerify(){
    await api.get(`/task/filter/late/11:11:11:11:11:11`)
    .then(response => {
      setLateCount(response.data.length)
      console.log('xx', response.data.length)
    })
  }

  async function Save(){
      await api.post('/task',
      {
          macaddress,
          type,
          title,
          description,
          when: `${date}T${hour}:00.000`
      }).then(()=>
        alert('Tarefa Cadastrada com Sucesso!')
      )
  }

  useEffect(() => {
    lateVerify();
  }, [])

  return (
    <S.Container>
      <Header lateCount={lateCount} />
       <S.Form>
           <S.TypeIcons>
               {//index foi colocado para tirar a posicao 0 do array
                   TypeIcons.map((icon, index) => (
                      index > 0 && 
                      <button type="button" onClick={() => setType(index)}>
                        <img src={icon} alt="Tipo da Tarefa"
                        className={type && type != index && "inative"}/>
                      </button>
                   ))
               }
           </S.TypeIcons>

           <S.Input>
               <span>Titulo</span>
               <input type="text" placeholder="Titulo da tarefa..."
               onChange={e => setTitle(e.target.value)} value={title}/>
           </S.Input>

            <S.TextArea>
                <span>Descricao</span>
                <textarea rows={5} placeholder="Detalhes da tarefa..."
                onChange={e => setDescription(e.target.value)} value={description}/>
            </S.TextArea>

            <S.Input>
               <span>Data</span>
               <input type="date" placeholder="Titulo da tarefa...."
               onChange={e => setDate(e.target.value)} value={date}/>
               {/* <img src={iconCalendar} alt="calendario"/> */}
           </S.Input>

           <S.Input>
               <span>Hora</span>
               <input type="time" placeholder="Titulo da tarefa..."
               onChange={e => setHour(e.target.value)} value={hour}/>
               {/* <img src={iconClock} alt="relogio"/> */}
           </S.Input>

           <S.Options>
               <div>
                   <input type="checkbox" checked={done} onChange={() => setDone(!done)}/>
                   <span>CONCLUÍDO</span>
               </div>
               <button type="button">EXCLUIR</button>
           </S.Options>

           <S.Save>
               <button type="button" onClick={Save}>SALVAR</button>
           </S.Save>

       </S.Form>
      <Footer />
    </S.Container>
  )
}

export default Task;

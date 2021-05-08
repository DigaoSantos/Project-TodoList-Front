import React, { useEffect, useState } from 'react';
import {Redirect} from 'react-router-dom';
import * as S from './styles';
import {format} from 'date-fns';

import api from '../../service/api';

//
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import TypeIcons from '../../utils/typeIcons'

import iconCalendar from '../../assets/calendar.png'
import iconClock from '../../assets/clock.png'

function Task({match}) {
  const [redirect, setRedirect] = useState(false);
  const [type, setType] = useState();
  const [id, setId] = useState();
  const [done, setDone] = useState(false);
  const [title, setTitle] = useState();
  const [description, setDescription] = useState();
  const [date, setDate] = useState();
  const [hour, setHour] = useState();
  const [macaddress, setMacaddress] = useState('11:11:11:11:11:11');


  async function LoadTaskDetails(){
    await api.get(`/task/${match.params.id}`)
    .then(response => {
      setType(response.data.type)
      setDone(response.data.done)
      setTitle(response.data.title)
      setDescription(response.data.description)
      setDate(format(new Date(response.data.when), 'yyyy-MM-dd'))
      setHour(format(new Date(response.data.when), 'HH:mm'))
    })
  }

  async function Save(){
      //validacao dos dados
      if(!title)
        return alert("voce precisa informar o titulo da tarefa")
      else if(!description)
        return alert("voce precisa informar o titulo da tarefa")
      else if(!type)
        return alert("voce precisa tipo da tarefa")
      else if(!date)
        return alert("voce precisa informar a data da tarefa")
      else if(!hour)
        return alert("voce precisa informar a hora da tarefa")


      if(match.params.id){
        await api.put(`/task/${match.params.id}`,
        {
            macaddress,
            done,
            type,
            title,
            description,
            when: `${date}T${hour}:00.000`
        }).then(()=>
          setRedirect(true)
        )

      }else{
        await api.post('/task',
        {
            macaddress,
            type,
            title,
            description,
            when: `${date}T${hour}:00.000`
        }).then(()=>
          setRedirect(true)
        )
    }
  }

  async function Remove(){
    const res = window.confirm('Deseja realmente remover a tarefa?')
    if (res == true){
      await api.delete(`/task/${match.params.id}`)
      .then(() => setRedirect(true))
    }
  }

  useEffect(() => {
    LoadTaskDetails();
  }, [])

  return (
    <S.Container>
      { redirect && <Redirect to="/" /> }
      <Header />
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
               {match.params.id && <button type="button" onClick={Remove}>EXCLUIR</button>}
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

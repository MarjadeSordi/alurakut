import React from 'react'
import { MainGrid } from '../src/components/MainGrid'
import { Box } from '../src/components/Box'
import { AlurakutMenu, AlurakutProfileSidebarMenuDefault, OrkutNostalgicIconSet } from '../src/lib/AlurakutComuns'
import { ProfileRelationsBoxWrapper } from '../src/components/ProfileRelations'


function ProfileSideBar(propriedades){ 
  return( 

        <Box as='aside'> 
        <img src={`https://github.com/${propriedades.githubUser}.png`} style = {{ borderRadius: '8px'}} />
        <hr />
        <p> 
        <a className="boxLink" href={`https://github.com/${propriedades.githubUser}`}>
          @{propriedades.githubUser}
        </a>
        </p> 
        <hr /> 
        <AlurakutProfileSidebarMenuDefault /> 
      </Box> 
  )
}

function ProfileRelationsBox(propriedades) {
  return (
    <ProfileRelationsBoxWrapper > 
    <h2 className='smallTitle'>  {propriedades.title} ({propriedades.items.length})  </h2>

    <ul> 
    {propriedades.items.map((seguidor) =>{
    return (
      <li key={seguidor.id}>
      <a href={`users/${seguidor.login}`}>
        <img src={`https://github.com/${seguidor.login}.png`} /> 
        <span> {seguidor.login} </span>
      </a>
      </li>
   ) }
      )}
  
  </ul> 
  </ProfileRelationsBoxWrapper > 
  )
}




export default function Home() {
  const githubUser = 'MarjadeSordi'
  const pessoasFavoritas = ['omariosouto', 'juunegreiros', 
  'marcobrunodev', 
  'pedronauck','willianjusten', 
  'giggio', 
 ]
 

const [seguidores, setSeguidores] = React.useState([])

React.useEffect(() => {
 
  fetch('https://api.github.com/users/MarjadeSordi/followers') 
    .then((respostadoServidor ) => respostadoServidor.json())
    .then((respostaCompleta) => setSeguidores(respostaCompleta)
    ) 
    
  //Dato
  fetch('https://graphql.datocms.com/', { 
    method: 'POST',
    headers: {
      'Authorization': 'ef8ac09ce6ada52b1d077491898c3e',
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    body: JSON.stringify( { "query":   `query {
      allCommunities {
        id
        title
        imageUrl
        creatorCommunity
      }
    }
    `})
  }) 
  .then((responseServer) => responseServer.json())
  .then((respostaretorno) =>{
    const comunidadesVindasDoDato = respostaretorno.data.allCommunities
    setComunidades(comunidadesVindasDoDato)
  }
  )
    

}, []);  
 



  const [comunidades, setComunidades ] = React.useState([{ 
   }])

  return(
  <>
    <AlurakutMenu /> 
    <MainGrid> 
      <div className="profileArea" style={ {gridAreas: 'profileArea' }}>
      <ProfileSideBar githubUser={githubUser} /> 
      </div>
      <div className="welcomeArea" style={{ gridAreas: 'welcomeArea' }}>
        <Box > 
          <h1 className="title"> Bem Vindo(a)!  
          </h1>
          <OrkutNostalgicIconSet /> 
        </Box> 
        <Box> 
          <h2 className='subTitle'> O que você deseja fazer?  </h2>
          <form onSubmit={ function handleCriaComunidade(e){
            e.preventDefault();
            const dadosdoForm = new FormData(e.target)

            const comunidade = {
              title:  dadosdoForm.get('title'),
              image_url: dadosdoForm.get('img'),
              creator_community: githubUser,
            }

            fetch('/api/comunidades', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(comunidade)
            })
            .then(async (response) => {
              const dados = await response.json();
              console.log(dados.registroComunidade)
              const comunidade = dados.registroComunidade;
              const comunidadesAtualizadas = [...comunidades, comunidade];
              setComunidades(comunidadesAtualizadas)

            })

           
          } } >
          <div> 
            <input 
              placeholder="Qual vai ser o nome da sua comunidade?" 
              name="title" 
              aria-label="Qual vai ser o nome da sua comunidade?" 
              typo='text'
            />
          </div>
          <div> 
            <input 
              placeholder="Coloque uma url para ser usada como capa" 
              name="img" 
              aria-label="Coloque uma url para ser usada como capa" 
              typo='text'
            />
          </div>
          <button>  
            Criar Comunidade
          </button>
          </form>
        </Box>
      </div>

      <div className="profileRelationArea" style={{ gridAreas: 'profileRelationArea' }}>  
      <ProfileRelationsBoxWrapper > 
        <h2 className='smallTitle'> Pessoas da Comunidade ({pessoasFavoritas.length})  </h2>
   
        <ul> 
        {pessoasFavoritas.map((pessoa) =>{
        return (
          <li key={pessoa}>
          <a href={`users/${pessoa}`}>
            <img src={`https://github.com/${pessoa}.png`} /> 
            <span> {pessoa} </span>
          </a>
          </li>
       ) }
          )}
      
      </ul>
      </ProfileRelationsBoxWrapper > 

      <ProfileRelationsBox title='Seguidores GitHub ' items={seguidores} /> 

      <ProfileRelationsBoxWrapper > 
        <h2 className='smallTitle'>    Minhas Comunidades ({comunidades.length})  </h2>
   
        <ul> 
        {comunidades.map((itemAtual) =>{
        return (
          <li key={itemAtual.id}>
          <a href={`/comunidades/${itemAtual.title}`} key={itemAtual.title}>
             <img src={itemAtual.imageUrl} />
            <span> {itemAtual.title} </span>
          </a>
          </li>
       ) }
          )} 
      
      </ul>
      </ProfileRelationsBoxWrapper > 
      </div>
  </MainGrid> 
  </>
   )
}

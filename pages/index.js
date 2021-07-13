import { MainGrid } from '../src/components/MainGrid'
import { Box } from '../src/components/Box'
import { AlurakutMenu, OrkutNostalgicIconSet } from '../src/lib/AlurakutComuns'
import { ProfileRelationsBoxWrapper } from '../src/components/ProfileRelations'

function ProfileSideBar(propriedades){ 
  console.log(propriedades)
  return( 

        <Box > 
        <img src={`https://github.com/${propriedades.githubUser}.png`} style = {{ borderRadius: '8px'}} />
      </Box> 
  )
}


export default function Home() {
  const githubUser = 'MarjadeSordi'
  const pessoasFavoritas = ['omariosouto', 'juunegreiros', 
  'marcobrunodev', 
  'pedronauck','willianjusten', 
  'giggio', 
 ]

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
      </div>
      <div className="profileRelationArea" style={{ gridAreas: 'profileRelationArea' }}>  
      <ProfileRelationsBoxWrapper > 
        <h2 className='smallTitle'>     Pessoas da Comunidade ({pessoasFavoritas.length})  </h2>
   
        <ul> 
        {pessoasFavoritas.map((pessoa) =>{
        return (
          <li>
          <a href={`users/${pessoa}`} key={pessoa}>
            <img src={`https://github.com/${pessoa}.png`} /> 
            <span> {pessoa} </span>
          </a>
          </li>
       ) }
          )}
      
      </ul>
      </ProfileRelationsBoxWrapper > 
      
      <Box > 
        Comunidade 
        </Box>
      </div>
  </MainGrid> 
  </>
   )
}

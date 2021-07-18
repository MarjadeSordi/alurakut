import { SiteClient } from 'datocms-client';

export default async function requisicoes(request, response) {
   
  if(request.method ==='POST'){
   
  const TOKEN = 'baedb8f6725b48ab5c64092de105ff'; 
  const client = new SiteClient(TOKEN);

  const registroComunidade = await client.items.create({
    itemType: "968438",
    ...request.body, 
  })

  response.json({
    dados: 'Teste',
    registroComunidade: registroComunidade,
  }) 
  return;
  }

  res.status(404).json({
    message: 'Erro 404'
  })


}
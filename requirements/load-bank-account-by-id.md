# Cadastro

> ## Caso de sucesso

1. ✔️ Recebe uma requisição do tipo **GET** na rota **/api/bank-accounts/:id**
2. ✔️ Valida se a requisição foi feita por um **usuário** ou **admin**
3. ✔️ Retorna **200** com a conta bancária

> ## Exceções

1. ✔️ Retorna erro **404** se a API não existir
2. ✔️ Retorna erro **404** se não encontrar a conta bancária
3. ✔️ Retorna erro **401** se não for um usuário ou admin
3. ✔️ Retorna erro **403** se o id do usuário presente na conta bancária pesquisada não for o mesmo id pego através do access-token, exceto para usuários admin
4. ✔️ Retorna erro **500** se der erro ao tentar carregar a conta bancária

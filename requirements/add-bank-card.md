# Adicionar cartão

> ## Caso de sucesso

1. ✔️ Recebe uma requisição do tipo **POST** na rota **/api/bank-accounts/:id/bank-cards**
2. ✔️ Valida dados obrigatórios **number**, **flag**, **expiresAt**
3. ❌ Valida que **flag** é umas das opções válidas presentes no array de flags do cadastro do banco
4. ✔️ **Cria** um cartão para o usuário com os dados informados
5. ✔️ Retorna **200** com o cartão

> ## Exceções

1. ✔️ Retorna erro **404** se a API não existir
2. ✔️ Retorna erro **400** se number, flag ou expiresAt não forem fornecidos pelo client
3. ❌ Retorna erro **400** se flag não for uma opção válida
4. ✔️ Retorna erro **401** se não for um usuário ou admin
5. ❌ Retorna erro **404** se o id do usuário presente na conta bancária pesquisada não for o mesmo id pego através do access-token, exceto para admins
6. ✔️ Retorna erro **500** se der erro ao tentar criar o cartão

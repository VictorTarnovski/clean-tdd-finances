# Adicionar transação

> ## Caso de sucesso

1. ✔️ Recebe uma requisição do tipo **POST** na rota **/api/transactions**
2. ✔️ Valida dados obrigatórios **description**, **value**, **operation**, **bankAccountId**
3. ✔️ Valida dados opcionais **bankCardId**
4. ✔️ Valida que **operation** é umas das opções válidas: **addition**, **subtraction**
5. ✔️ **Cria** uma transação para o usuário com os dados informados
6. ✔️ Retorna **200** com a conta bancária já com o novo saldo

> ## Exceções

1. ✔️ Retorna erro **404** se a API não existir
2. ✔️ Retorna erro **400** se description, value, operation, bankAccountId não forem fornecidos pelo client
3. ✔️ Retorna erro **400** se operation não for uma opção válida
4. ✔️ Retorna erro **404** se não existir uma conta bancária com o id fornecido
5. ✔️ Retorna erro **404** se não existir um cartão com o id fornecido
6. ✔️ Retorna erro **401** se não for um usuário ou admin
7. ❌ Retorna erro **404** se o id do usuário presente na conta bancária pesquisada não for o mesmo id pego através do access-token, exceto para admins
8. ✔️ Retorna erro **500** se der erro ao tentar criar o cartão

# Adicionar conta bancária

> ## Caso de sucesso

1. ✔️ Recebe uma requisição do tipo **POST** na rota **/api/bank-accounts**
2. ✔️ Valida dados obrigatórios **number**, **currency**
3. ✔️ Valida que **currency** é umas das opções válidas fornecidas no endpoint GET /currencies
4. ✔️ Verifica dado opcional **balance**
5. ✔️ **Cria** uma conta bancária para o usuário com os dados informados, **adicionando** o id do usuário na conta bancária
6. ✔️ Retorna **200** com a conta bancária

> ## Exceções

1. ✔️ Retorna erro **404** se a API não existir
2. ✔️ Retorna erro **400** se number ou currency não forem fornecidos pelo client
3. ✔️ Retorna erro **400** se currency não for uma opção válida
4. ✔️ Retorna erro **401** se não for um usuário
5. ✔️ Retorna erro **500** se der erro ao tentar criar a conta bancária

(function() {
  angular.module('primeiraApp').controller('BillingCycleCtrl', [
    '$http',
    'msgs',
    BillingCycleController
  ])

  function BillingCycleController($http, msgs) {
    const vm = this
    vm.create = function() {
      const url = 'http://localhost:3003/api/billingCycles'
      $http.post(url, vm.billingCycle).then(resposta => {
        vm.billingCycle = {}
        msgs.addSuccess('Operação realizada com sucesso!!')
      }).catch(resposta => {
        msgs.addError(resposta.data.errors)
      })
    }
  }
})()
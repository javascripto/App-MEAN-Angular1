(function() {
  angular.module('primeiraApp').controller('BillingCycleCtrl', [
    '$http',
    'msgs',
    'tabs',
    BillingCycleController
  ])

  function BillingCycleController($http, msgs, tabs) {
    const vm = this
    const url = 'http://localhost:3003/api/billingCycles'
    
    vm.refresh = function() {
      $http.get(url).then(response => {
        vm.billingCycle = {}
        vm.billingCycles = response.data
        tabs.show(vm, {tabList: true, tabCreate: true})
      })
    }

    vm.create = function() {
      $http.post(url, vm.billingCycle).then(resposta => {
        vm.refresh()
        msgs.addSuccess('Operação realizada com sucesso!!')
      }).catch(resposta => {
        msgs.addError(resposta.data.errors)
      })
    }

    vm.showTabUpdate = function(billingCycle) {
      vm.billingCycle = billingCycle
      tabs.show(vm, {tabUpdate: true})
    }

    vm.showTabDelete = function(billingCycle) {
      vm.billingCycle = billingCycle
      tabs.show(vm, {tabDelete: true})
    }

    vm.update = function() {
      const updateURL = `${url}/${vm.billingCycle._id}`
      $http.put(updateURL, vm.billingCycle).then(response => {
        vm.refresh()
        msgs.addSuccess('Operação realizada com sucesso!!')
      }).catch(response => {
        msgs.addError(response.data.errors)
      })
    }

    vm.delete = function() {
      const deleteURL = `${url}/${vm.billingCycle._id}`
      $http.delete(deleteURL, vm.billingCycle).then(response => {
        vm.refresh()
        msgs.addSuccess('Operação realizada com sucesso!!')
      }).catch(response => {
        msgs.addError(response.data.errors)
      })
    }

    vm.refresh()
  }
})()
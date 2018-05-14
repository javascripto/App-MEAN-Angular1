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
        vm.billingCycle = {credits: [{}], debts: [{}]}
        vm.billingCycles = response.data
        vm.calculateValues()
        if (vm.tabCreate) return $('[data-target="#tabList"]').click()
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
      vm.calculateValues()
    }

    vm.showTabDelete = function(billingCycle) {
      vm.billingCycle = billingCycle
      tabs.show(vm, {tabDelete: true})
      vm.calculateValues()
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

    vm.addCredit = function(index) {
      vm.billingCycle.credits.splice(index + 1, 0, {})
      vm.calculateValues()
    }

    vm.cloneCredit = function(index, {name, value}) {
      vm.billingCycle.credits.splice(index + 1, 0, {name, value})
      vm.calculateValues()
    }

    vm.deleteCredit = function(index) {
      vm.billingCycle.credits[index] = {}
      if (vm.billingCycle.credits.length > 1)
        vm.billingCycle.credits.splice(index, 1)
      vm.calculateValues()
    }
    vm.addDebt = function(index) {
      vm.billingCycle.debts.splice(index + 1, 0, {})
      vm.calculateValues()
    }

    vm.cloneDebt = function(index, {name, value, status}) {
      vm.billingCycle.debts.splice(index + 1, 0, {name, value, status})
      vm.calculateValues()
    }

    vm.deleteDebt = function(index) {
      vm.billingCycle.debts[index] = {}
      if (vm.billingCycle.debts.length > 1)
        vm.billingCycle.debts.splice(index, 1)
      vm.calculateValues()
    }

    vm.calculateValues = function() {
      vm.credit = 0
      vm.debt = 0

      if (vm.billingCycle) {
        vm.billingCycle.credits.forEach(({value}) => {
          vm.credit += !value || isNaN(value) ? 0 : parseFloat(value)
        })
        vm.billingCycle.debts.forEach(({value}) => {
          vm.debt += !value || isNaN(value) ? 0 : parseFloat(value)
        })
      }

      vm.total = vm.credit - vm.debt

    }

    vm.refresh()
  }
})()
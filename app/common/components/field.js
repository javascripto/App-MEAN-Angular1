(function() {
  angular.module('primeiraApp').component('field', {
    bindings: {
      id: '@',
      label: '@',
      grid: '@',
      placeholder: '@',
      type: '@',
      model: '=', /* Binding entre componentes */
      readonly: '<' /* Binding de sentido unico */
    },
    controller: [
      'gridSystem',
      function(gridSystem) {
        this.$onInit = () => this.gridClasses = gridSystem.toCssClasses(this.grid)
      }
    ],
    template: `
    <div class="{{ $ctrl.gridClasses }}">
      <div class="form-group">
        <label for="{{ $ctrl.id }}">{{ $ctrl.label }}</label>
        <input class="form-control" type="{{ $ctrl.type }}"
          id="{{ $ctrl.id }}" ng-model="$ctrl.model"
          placeholder="{{ $ctrl.placeholder }}"
          ng-readonly="$ctrl.readonly">
      </div>
    </div>`
  })
})()
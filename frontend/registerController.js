angular.module("register", []);
angular
  .module("register")
  .controller("registerController", function($scope, $http) {
    $scope.page = 1;
    $scope.fEmail = "";
    $scope.disablePrevious = true;
    $scope.disableNext = true;
    $scope.searchCepResidencial = function() {
      $http
        .get(`https://viacep.com.br/ws/${$scope.cep_residencial}/json/`)
        .then(
          function(response) {
            if (response.data.erro == true) {
              $scope.cepResInvalid = true;
              $scope.cepRes = null;
            } else {
              $scope.cepResInvalid = false;
              $scope.cepRes = response.data;
              $scope.cepResNotExist = false;
            }
          },
          function(error) {
            $scope.cepResNotExist = error;
            $scope.cepRes = null;
          }
        );
    };

    $scope.searchCepComercial = function() {
      $http.get(`https://viacep.com.br/ws/${$scope.cep_comercial}/json/`).then(
        function(response) {
          if (response.data.erro == true) {
            $scope.cepComInvalid = true;
            $scope.cepCom = null;
          } else {
            $scope.cepComInvalid = false;
            $scope.cepCom = response.data;
            $scope.cepComNotExist = false;
          }
        },
        function(error) {
          $scope.cepComNotExist = error;
          $scope.cepCom = null;
        }
      );
    };

    $scope.getList = function() {
      $http.get("http://localhost:7777/users").then(function(response) {
        $scope.users = response.data;
        if ($scope.users.length >= 3) {
          $scope.disableNext = false;
        }
      });
    };

    $scope.nextPage = function() {
      $scope.page++;
      $http
        .get(`http://localhost:7777/users/?page=${$scope.page}`)
        .then(function(response) {
          $scope.users = response.data;
          if ($scope.users.length < 3) {
            $scope.disableNext = true;
          }
          $scope.disablePrevious = false;
        });
    };

    $scope.previousPage = function() {
      $scope.page--;
      $http
        .get(`http://localhost:7777/users/?page=${$scope.page}`)
        .then(function(response) {
          $scope.users = response.data;
          if ($scope.page == 1) {
            $scope.disablePrevious = true;
          }
          $scope.disableNext = false;
        });
    };

    $scope.getUser = function() {
      if ($scope.fEmail != "") {
        $http.get(`http://localhost:7777/users/${$scope.fEmail}`).then(
          function(response) {
            console.log(response.data);
            $scope.dataUser = response.data;
          },
          function(error) {
            alert(error.data.error);
          }
        );
      } else {
        alert("Digite um email");
      }
    };

    $scope.createNewUser = function() {
      $http({
        method: "POST",
        url: "http://localhost:7777/users",
        data: {
          name: $scope.name,
          gender: $scope.gender,
          email: $scope.email,
          cpf: $scope.cpf,
          cep_residencial: $scope.cep_residencial,
          cep_comercial: $scope.cep_comercial,
          birth_date: $scope.birth_date,
          phone: $scope.phone,
          cell_phone: $scope.cell_phone
        }
      }).then(
        function() {
          alert("Usuário criado com sucesso");
        },
        function(error) {
          alert("Erro: " + error.data.error);
        }
      );
    };

    $scope.comercial = function() {
      $scope.endC = true;
    };
  });

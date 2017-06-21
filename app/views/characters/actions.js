/**
 * Created by lelabo on 16/06/17.
 */
angular.module('gurps-online').controller('charactersActionCtrl', function($scope, $state, $stateParams, $mdDialog,
                                                                           Dices,
                                                                           CharactersService, Characters, MenuService) {

    function loadCharacter() {
        CharactersService.get($stateParams.characterId).then(function (character) {
            $scope.character = Characters.build(character);
            MenuService.currentTitle = 'Character : ' + $scope.character.name;
        }, function (err) {
            console.log(err);
        });
    }
    loadCharacter();

    function modalData(template, ev, controller) {
     return {
         controller: controller,
         templateUrl: template,
         parent: angular.element(document.body),
         clickOutsideToClose: true,
         targetEvent: ev,
         resolve: {
             character: function () {
                 return $scope.character;
             }
         }
     }
    }

    $scope.climbing = function (template, ev) {
        $mdDialog.show(modalData(template, ev, ClimbingCtrl));
    };

    $scope.hiking = function (template, ev) {
        $mdDialog.show(modalData(template, ev, HikingCtrl));
    };
});

function ClimbingCtrl($scope, $mdDialog, Dices, character) {
    // TODO : FP gestion
    // TODO : Add climbing documentation
    $scope.character = character;
    $scope.skill = character.dexterity - 5;
    var activeskill = character.getSkills('Climbing');
    if (activeskill) {
        $scope.skill = character.dexterity + activeskill.bonus;
    }
    if (character.hasAdvantage("Flexibility")) {
        $scope.skill += 3;
    } else if (character.hasAdvantage("Double-Jointed")) {
        $scope.skill += 5;
    }
    $scope.roll = function () {
        var modifier = $scope.modifier;
        if (modifier == undefined) {
            modifier = 0;
        }
        var draw = Dices.compose('3d6', modifier);
        Dices.roll(draw).then(function (score) {
            $scope.score = score;
            $scope.result = $scope.skill >= score;
        });
    };
    $scope.hide = function() {
        $mdDialog.hide();
    };
    $scope.cancel = function() {
        $mdDialog.cancel();
    };
}

function HikingCtrl($scope, $mdDialog, Dices, character) {
    // Todo: doc on hiking
    // TODO: Use the FP costs for fighting a battle, but assess them per hour of road travel; e.g., one hour of marching with light encumbrance costs 2 FP
    $scope.character = character;
    $scope.skill = character.health - 5;
    var activeskill = character.getSkills('Hiking');
    if (activeskill) {
        $scope.skill = character.health + activeskill.bonus;
    }
    $scope.roll = function () {
        var modifier = $scope.modifier;
        if (modifier == undefined) {
            modifier = 1;
        }
        Dices.roll('3d6').then(function (score) {
            $scope.score = score;
            $scope.result = 100;
            if ($scope.skill >= score) {
                $scope.result += 20;
            }
            console.log($scope.result);
            console.log(modifier);
            $scope.result *= modifier;
        });
    };
    $scope.hide = function() {
        $mdDialog.hide();
    };
    $scope.cancel = function() {
        $mdDialog.cancel();
    };
}

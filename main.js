describe("Config", function() {
	
	var preloader = null;

	var tmpString = "";

	beforeEach(function(){

		preloder = null;

	});

	it("should add good UI objects", function(){

		var config = {

			UI: {
                onLoadFile: function(loaded, all, percange) {

                    
                    
                },
                init: function() {

                	tmpString = "init";

                },
                complete: function(){


                }
            }
		};

		preloader = new PRELOADER(config);

		expect(tmpString).toBe("init");

	});



});
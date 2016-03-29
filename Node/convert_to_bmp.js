setTimeout(function() {
console.log("test"); }, 300);



var concat = require( 'concat-files' );
var fs = require( 'fs' );
var gm = require( 'gm' );
var path = require( 'path' );
var process = require( 'process' );


var targetBMP = 'L:\\Glitch\\2016-03-20\\temp\\IMG_6782.bmp';
var targetImageFolder = path.resolve('I:/Photography/2015/5-23 Botanical Gardens');
var tempPath = 'L:\\Glitch\\temp\\';
var outputPath = 'L:\\Glitch\\2016-03-20\\';
var soxExec = 'C:\\Program Files (x86)\\sox-14-4-2\\sox.exe';

const exec = require('child_process').exec;

String.prototype.addSlashes = function() 
{ 
   //no need to do (str+'') anymore because 'this' can only be a string
   return this.replace(/[\\"']/g, '\\$&').replace(/\u0000/g, '\\0');
} 

// Constructor
function imageProc(inputFile) {
  // always initialize all instance properties
  var that = this;
  that.header = tempPath + 'header2.raw';
  that.image = tempPath + 'image2.raw';
  that.editedImage = tempPath + 'modified2.raw';
  that.modifySource = that.image;
  that.inputFile = inputFile;
  that.outputBMP = that.inputFile;
  /* 
console.log(that.header);
console.log(that.image);
console.log(that.editedImage);
console.log(that.modifySource);
console.log(that.inputFile);
console.log(that.outputBMP);  */

  imageProc.prototype.exportImage = function(outputFile, cb) {
    concat([
      that.header,
      that.editedImage
    ], outputFile, function() {
      console.log('done');
    });
  };
   
  imageProc.prototype.convertToBMP = function(BMPFile, cb) {
    that.outputBMP = BMPFile;
    console.log("in IM: " + that.inputFile);

    gm(that.inputFile)
    .minify(1)
    .write(BMPFile, function (err) {
        if (!err) {
        console.log('done');
        cb(null, BMPFile);
        } else {
        console.log(err);
        cb(err, BMPFile);
        }
      }
    );
  };

  imageProc.prototype.splitImage = function(err, cb) {
    console.log('in split - ' + that.outputBMP);
    that.writeHeader(null, 
      that.writeImage(null, cb)
    );
  };

  imageProc.prototype.writeHeader = function(err, cb) {
    //console.log('in write header - ' + that.outputBMP);
    exec('"' + soxExec + '" --buffer 64000 --clobber -t raw -r 16k -e a-law -D -b 8 -c 1 --ignore-length ' + that.outputBMP + ' ' + that.header + ' trim 0 0.1', cb);
  }

  imageProc.prototype.writeImage = function(err, cb) {
    exec('"' + soxExec + '" --buffer 64000 --clobber -t raw -r 16k -e a-law -D -b 8 -c 1 --ignore-length ' + that.outputBMP + ' ' + that.image + ' trim 0.1 500000', cb);
  }
    
  imageProc.prototype.applyGMTransform = function(err, command, cb) {
    console.log('in imageProc - ' + command[0] + command[1] + '"' + that.outputBMP + '"');
    exec(command[0] + command[1] + '"' + that.outputBMP + '"', cb);
  };

  imageProc.prototype.applySoxTransform = function(err, command, cb) {
    console.log('in sox - ' + that.outputBMP);
    that.splitImage( null, function(err, cb){
      if (that.modifySource == tempPath + 'modified2.raw') {
        that.modifySource = tempPath + 'modified2.raw';
        that.editedImage = tempPath + 'modified3.raw';
      } else if (that.modifySource == tempPath + 'modified3.raw') {
        that.modifySource = tempPath + 'modified3.raw';
        that.editedImage = tempPath + 'modified2.raw';
      }
    
      exec(command[0] + '"' + that.modifySource + '"' + command[1] + '"' + that.editedImage + '"' + command[2] ,
        function(err, cb){ that.exportImage(that.inputFile, cb) }
      );
    });
  };
  
  imageProc.prototype.generateMultipleCommands = function(err, iterations, cb) {
    for (var i = 0; i < iterations; i++)
    {
      console.log("in loop: " + i);
      var randR1 = that.retRandRegion(null, function(){});
      var w1 = that.returnRandomWidth(null, function(){});
      var w2 = that.returnRandomWidth(null, function(){});
      var h1 = that.returnRandomHeight(null, function(){});
      var h2 = that.returnRandomHeight(null, function(){});
      that.applyGMTransform(null, ['gm mogrify -region ' + that.retRandRegion() + '+' + w1 + '+' + h1 +' -roll ' + '+' + w2 + '+' + h2 + ' ', '', ''], function() { }
      );
    }
  };
  
  imageProc.prototype.retRandRegion = function(err, cb) {
    return gm(that.outputBMP).size(function(err, size) {
      console.log("in region: " + getRandomInt(0,size.width));
      return "" + getRandomInt(0,size.width) + "x" + getRandomInt(0,size.height);
    });
  };
  
  imageProc.prototype.returnRandomWidth = function(err, cb) {
    return gm(that.outputBMP).size(function(err, size) {
      return getRandomInt(0,size.width);
    })
  };
  
  imageProc.prototype.returnRandomHeight = function(err, cb) {
    return gm(that.outputBMP).size(function(err, size) {
      return getRandomInt(0,size.height);
    })
  };
}




function populateImageArray(callback) {
	var newArray = [];
	fs.readdir(targetImageFolder, function(err, items) {
		for (var i=0; i<items.length; i++) {
			if (items[i].search("JPG") > 0) {
			  newArray.push(targetImageFolder + "\\" + items[i]);
			  //console.log(targetImageFolder + "\\" + items[i]);
			}
		}
		//console.log("waht" + newArray[0]);
		callback(newArray);
	});
}





populateImageArray(
	function(array) {
		var thisImage = new imageProc(array[getRandomInt(0,array.length)]);
		//var gain2 = new editCommand(null, 'gm mogrify -region 250x250+500+500 -roll +50+50 ', '', '', function(){});
    //var gain3 = new editCommand(null, '"C:\\Program Files (x86)\\sox-14-4-2\\sox.exe" --buffer 64000 −G --clobber -t raw -r 16k -e a-law -D -b 8 -c 1 --ignore-length ', ' ', ' gain -0.1 treble +0.1', function(){});
		thisImage.convertToBMP(tempPath + 'test2.bmp', function(){
      thisImage.generateMultipleCommands(null, 6, function(){console.log('innermost closure');})
/* 		    thisImage.applyGMTransform(null, gain2, function(){
		  }) */
		})  ;
	}
);

  
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

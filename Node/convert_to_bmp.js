


var concat = require( 'concat-files' )
var fs = require( 'fs' )
var gm = require( 'gm' )
var im = gm.subClass({ imageMagick: true })
var path = require( 'path' )
var process = require( 'process' )
var gi = require( 'glichtimage' )




var targetBMP = 'L:\\Glitch\\2016-03-20\\temp\\IMG_6782.bmp';
var targetImageFolder = path.resolve('I:/Photography/2015/5-23 Botanical Gardens');
var tempPath = 'L:\\Glitch\\temp\\';
var outputPath = 'L:\\Glitch\\2016-03-20\\';
var soxExec = 'C:\\Program Files (x86)\\sox-14-4-2\\sox.exe';


const exec = require('child_process').execSync

String.prototype.addSlashes = function() 
{ 
   //no need to do (str+'') anymore because 'this' can only be a string
   return this.replace(/[\\"']/g, '\\$&').replace(/\u0000/g, '\\0')
} 

gi.populateImageArray(
	function(array) {
    for (var i = 0; i < 8; i++) {
      var thisImage = new gi.imageProc(array[gi.getRandomInt(0,array.length)])
      var wrapIt = (function (thisImage) {
        return function(){
          gi.convertToBMP(null, thisImage, function(){
            gi.generateMultipleCommands(null, thisImage, gi.getRandomInt(1, 1), function(){})
          })
        }
      }) (thisImage)
      wrapIt(thisImage)
    }
	}
)

/* setTimeout(function() {
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

const exec = require('child_process').execSync

String.prototype.addSlashes = function() 
{ 
   //no need to do (str+'') anymore because 'this' can only be a string
   return this.replace(/[\\"']/g, '\\$&').replace(/\u0000/g, '\\0')
} 

// Constructor
function imageProc(inputFile) {
  // always initialize all instance properties
  var that = this
  var d = new Date();
  this.header = tempPath + 'header2.raw'
  this.image = tempPath + 'image2.raw'
  this.editedImage = tempPath + 'modified2.raw'
  this.modifySource = that.image
  this.inputFile = inputFile
  this.outputBMP = tempPath + d.getFullYear() + '-' + d.getMonth() + '-' + d.getDay() + '-' + d.getHours() + '-' + d.getMinutes() + '-' + d.getMilliseconds() + '.bmp'
  
  /* 
  console.log(that.header);
  console.log(that.image);
  console.log(that.editedImage);
  console.log(that.modifySource);
  console.log(that.inputFile);
  console.log(that.outputBMP);


  imageProc.prototype.getWidth = function(outputFile, cb) {
    return gm(that.inputFile).size(function(err, size) {
      //console.log("width : " + size.width)
      that.width = size.width/2
    })
  }

  that.getWidth()
  
  imageProc.prototype.getHeight = function(outputFile, cb) {
    return gm(that.inputFile).size(function(err, size) {
      //console.log("Height : " + size.Height)
      that.height = size.height/2
    })
  }

  that.getHeight()
  
  imageProc.prototype.exportImage = function(outputFile, cb) {
    concat([
      that.header,
      that.editedImage
    ], outputFile, function() {
      console.log('done')
    })
  }

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
  
  //that.imageProcesses = [ 'imgNormalize' ];
  that.imageProcesses = [ 'imgRoll', 'imgMonochrome', 'imgNegate', 'imgEqualize', 'imgEnhance', 'imgGamma', 'imgImplode', 'imgCharcoal', 'imgNormalize'];
  
  // extreme: imgCharcoal, imgImplode
  // medium: imgNormalize, imgGamma
  // boring: 'imgDespeckle', 'imgAntialias', 
  
  
  imageProc.prototype.genRegion = function(err, cb) {
    return (' -region ' + that.retRandRegion())
  }
  
  imageProc.prototype.imgRoll = function(err, region, cb) {
    var w1 = that.returnRandomWidth(null, function(){})
    var h1 = that.returnRandomHeight(null, function(){})
    return ['gm mogrify ' + region + ' -roll ' + '+' + w1 + '+' + h1 + ' ', '', '']
  }
  
  imageProc.prototype.imgMonochrome = function(err, region, cb) {
    return ['gm mogrify ' + region + ' -monochrome ', '', '']
  }
  
  imageProc.prototype.imgNegate = function(err, region, cb) {
    return ['gm mogrify ' + region + ' -negate ', '', '']
  }
  
  imageProc.prototype.imgEqualize = function(err, region, cb) {
    return ['gm mogrify ' + region + ' -equalize ', '', '']
  }
  
  imageProc.prototype.imgEnhance = function(err, region, cb) {
    return ['gm mogrify ' + region + ' -enhance ', '', '']
  }
  
  imageProc.prototype.imgGamma = function(err, region, cb) {
    return ['gm mogrify ' + region + ' -gamma ' + getRandomDecimal(0.1, 3) + ' ', '', '']
  }
  
  imageProc.prototype.imgImplode = function(err, region, cb) {
    return ['gm mogrify ' + region + ' -implode ' + getRandomDecimal(-1, 1) + ' ', '', '']
  }
  
  imageProc.prototype.imgDespeckle = function(err, region, cb) {
    return ['gm mogrify ' + region + ' -despeckle ', '', '']
  }
  
  imageProc.prototype.imgAntialias = function(err, region, cb) {
    return ['gm mogrify ' + region + ' -antialias ', '', '']
  }
  
  imageProc.prototype.imgCharcoal = function(err, region, cb) {
    return ['gm mogrify ' + region + ' -charcoal ' + getRandomDecimal(0.001, 3) + ' ', '', '']
  }
  
  imageProc.prototype.imgNormalize = function(err, region, cb) {
    return ['gm mogrify ' + region + ' -normalize ', '', '']
  }
  




  imageProc.prototype.retRandRegion = function(err, cb) {
    //console.log("in region: " + getRandomInt(0,that.width))
    randX = getRandomInt(0,that.width)
    randY =  getRandomInt(0,that.height)
    
    randW = getRandomInt(0,that.width)
    randH =  getRandomInt(0,that.height)
    
    if ((randX + randW) > that.width) {
      if (randX > randW) {
        randX -= randW
      } else {
        randW -= randX
      }
    }
    
    if ((randY + randH) > that.height) {
      if (randY > randH) {
        randY -= randH
      } else {
        randH -= randY
      }
    }
    
    return "" + randX + "x" + randY + '+' + randW + '+' + randH
  }
  
  imageProc.prototype.returnRandomWidth = function(err, cb) {
    //console.log(that.width)
    randW = getRandomInt(0,that.width)
    if (randW > (that.width / 2)) { Math.round(randW /= 1) }
    return randW
  }
  
  imageProc.prototype.returnRandomHeight = function(err, cb) {
    randH =  getRandomInt(0,that.height)
    if (randH > (that.height / 2)) { Math.round(randH /= 1) }
    return randH
  }
}

function applySoxTransform (err, imageObj, command, cb) {
  console.log('in sox - ' + imageObj.outputBMP);
  imageObj.splitImage( null, function(err, cb){
    if (imageObj.modifySource == tempPath + 'modified2.raw') {
      imageObj.modifySource = tempPath + 'modified2.raw';
      imageObj.editedImage = tempPath + 'modified3.raw';
    } else if (imageObj.modifySource == tempPath + 'modified3.raw') {
      imageObj.modifySource = tempPath + 'modified3.raw';
      imageObj.editedImage = tempPath + 'modified2.raw';
    }
  
    exec(command[0] + '"' + imageObj.modifySource + '"' + command[1] + '"' + imageObj.editedImage + '"' + command[2] ,
      function(err, cb){ imageObj.exportImage(imageObj.inputFile, cb) }
    )
  })
}

function applyGMTransform (err, imageObj, command, cb) {
    //console.trace(this);
    console.log(imageObj.outputBMP  + '     in imageProc - ' + command[0] + command[1]) //+ '"' + imageObj.outputBMP + '"' + " cb: " + cb);
    exec(command[0] + command[1] + '"' + imageObj.outputBMP + '"', cb);
  };


function generateMultipleCommands (err, imageObj, iterations, cb) {
    if (iterations > 0) {
      //console.log("in loop: " + iterations)
      applyGMTransform(null,
        imageObj, 
        imageObj[getRandomElement(err, imageObj.imageProcesses)](null, imageObj.genRegion(), function(){}),
        generateMultipleCommands(err, imageObj, iterations - 1,
        function(){})
      )
    } else {
      cb
    }
  }

function flipCoin() {
  return Math.round(Math.random())
}

function populateImageArray(callback) {
	var newArray = []
	fs.readdir(targetImageFolder, function(err, items) {
		for (var i = 0; i<items.length; i++) {
			if (items[i].search("JPG") > 0) {
			  newArray.push(targetImageFolder + "\\" + items[i])
			  //console.log(targetImageFolder + "\\" + items[i])
			}
		}
		//console.log("waht" + newArray[0]);
		callback(newArray)
	})
}

   
function convertToBMP (err, imageObj, cb) {
  console.log("generating BMP: " + imageObj.outputBMP);

  gm(imageObj.inputFile)
  .minify(1)
  .write(imageObj.outputBMP, function (err) {
      if (!err) {
      //console.log('done');
      cb(null, imageObj.outputBMP);
      } else {
      console.log(err);
      cb(err, imageObj.outputBMP);
      }
    }
  )
}

populateImageArray(
	function(array) {
    for (var i = 0; i < 15; i++) {
      var thisImage = new imageProc(array[getRandomInt(0,array.length)])
      var wrapIt = (function (thisImage) {
        return function(){
          convertToBMP(null, thisImage, function(){
            generateMultipleCommands(null, thisImage, getRandomInt(2, 15), function(){})
          })
        }
      }) (thisImage)
      wrapIt(thisImage)
    }
	}
)

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min
}

function getRandomDecimal(min, max) {
  return Math.random() * (max - min) + min
}

function getRandomElement(err, array) {
  //console.log("in getRandomElement: " + array[getRandomInt(0,array.length)])
  return array[getRandomInt(0,array.length)]
} */
import test from 'ava';
var gi = require('glichtimage')
//
test('foo', t => {
    t.pass();
});

test('bar', async t => {
    const bar = Promise.resolve('bar');

    t.is(await bar, 'bar');
});

test('tryPass', t => {
    t.pass();
});

test('getRandomInt', t => {
  var retVal = gi.getRandomInt(0,5)
  //console.log(retVal)
  if (retVal >= 0 && retVal <= 5) {
    //console.log(retVal)
    t.pass()
  } else {
    t.fail()
  }
})


test('getRandomInt - zeros', t => {
  var retVal = gi.getRandomInt(0,0)
  //console.log(retVal)
  if (retVal == 0) {
    //console.log(retVal)
    t.pass()
  } else {
    t.fail()
  }
})

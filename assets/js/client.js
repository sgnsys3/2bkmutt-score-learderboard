var client = io()

client.emit('requireData')
client.on('returnData', function (data) {
  var thisBase = $('#base').val()
  for(i=1;i<=5;i++) {
    if(data.sectionData[i][thisBase] === true) {
      $('#btn-successful-'+i).toggleClass('disabled')
      $('#btn-successful-'+i).html('Submitted')
    }
  }
})

$('.successful').click(function () {
  client.emit('successful', {
    sec: $(this).attr('section'),
    base: $('#base').val()
  })
  $(this).toggleClass('disabled')
  $(this).html('Submitted')
})
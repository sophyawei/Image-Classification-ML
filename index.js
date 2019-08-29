let net;

// init
$('#title').text('Choose one image...');
$('#predict').hide();
$('#tryAgain').hide();
$('#predict-msg').hide();
$('.loader').hide();
$('#result').hide();

// upload preview
function readURL(input) {
  if (input.files && input.files[0]) {
    var reader = new FileReader();
    reader.onload = function (e) {
      $('#imagePreview').attr('src', e.target.result);
    }
    reader.readAsDataURL(input.files[0]);
    $('#imageUpload').hide();
    $('#title').text('Ready to predict!');
  }
}

// detect image get upload
$("#imageUpload").change(function () {
  $('#predict').show();
  $('#result').text('');
  $('#result').hide();
  readURL(this);
});

// track when predict button is click
$('#predict').click(function () {
  // show loading animation
  $(this).hide();
  $('.loader').show();
  $('#predict-msg').show();
  // run AI
  app();
});

// AI part
async function app() {
  // load the model.
  net = await mobilenet.load();

  // make a prediction through the model on our image.
  const imgEl = document.getElementById('imagePreview');
  const result = await net.classify(imgEl);

  // print the result
  $('.loader').hide();
  $('#predict-msg').hide();
  $('#result').show();
  $('#imageUpload').show();
  $('#title').text("Isn't it fun? Try a different image :)");

  var print = '';
  for (var i=0;i<result.length;i++) {
    print = print + "* " + result[i].probability + " probability that it is a <strong>" + result[i].className + "</strong><br>"
  };
  document.getElementById('result').innerHTML = print;
}

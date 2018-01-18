$(document).ready(function(){
  //Prototype methods
  if (!Array.prototype.last){
    Array.prototype.last = function(){
        return this.length - 1;
    };
  };
  //init
  getAllPlaylists();
  //global variables
  var currentPlaylistData = null;
  var AllplaylistsData = null;
  var currentPlaylistSongs = null;
  var editPressed = false;
  var count =0;
  var globalId2=null;
  var playerEditFlag=false;
  var playerDeleteFlag=false;
  var globalId = null;
  //functions
    //main Ajax function
  function mainAjax($type, $url, $data, command, id){
    if(command === 'createNewPlaylist') {
      var sendData = {
                      name: $data.name,
                      image: $data.image,
                      songs: JSON.stringify($data.songs)
                    };
    }if(command === 'updateExistingPlaylist') {
      if ($data.name && $data.image) {
        var sendData = {
          name : $data.name,
          image: $data.image
        };
      }else if ($data.name && !$data.image) {
          var sendData = {name: $data.name}
        }else{
          var sendData = {image: $data.image};
        }
    }if(command === 'updatePlaylistSongs') {
      var sendData = {
                    songs: JSON.stringify($data)
                  }
    }if(command === ('getAllPlaylists' || 'deleteExistingPlaylist' || 'getPlaylistSongs' || 'getPlaylistSongs2')){
        var sendData = '';
       }
       $.ajax({
         method: $type,
         url: $url,
         data: sendData,
         success: function(data){
            if(data.success === true){
            console.log('command is ' + command);
            if(command === 'createNewPlaylist'){
               getAllPlaylists();
            }
            if(command === 'getAllPlaylists'){
             returnAllPlaylists(data.data);
             populatePlaylists();
            }
            if(command === 'deleteExistingPlaylist'){
             getAllPlaylists();
            }
            if(command === 'getExistingPlaylist'){
            }
            if(command === 'updateExistingPlaylist'){
              getAllPlaylists();
            }
            if(command === 'updatePlaylistSongs'){
              if(playerEditFlag){
                getPlaylistSongs2(globalId2)
              }
            }
            if(command === 'getPlaylistSongs'){
                 returnPlaylistSongs(data.data.songs);
                 if(editPressed){
                   for (var i = 0; i < AllplaylistsData.length; i++) {
                     if (AllplaylistsData[i].id ===  id) {
                       $('#playlistName').val(AllplaylistsData[i].name);
                       $('#playlistURL').val(AllplaylistsData[i].image);
                       $('#songsRow').html('');
                       for (var j = 0; j < currentPlaylistSongs.length; j++) {
                          $('#songsRow').append('<p><input class = "s1 form-control songURL"></input> <input class = "s1 form-control songName" placeholder="Song Name"></input></p>');
                         $('.songName').last().val(currentPlaylistSongs[j].name);
                         $('.songURL').last().val(currentPlaylistSongs[j].url);
                       }
                     }
                   }
                   $('#modalAddNew1').find('.modal-title').html('Edit Playlist');
                   $('#modalAddNew2').find('.modal-title').html('Edit Songs');
                   $('#modalAddNew2').find('#btnSave').html('Update');
                   $('#modalAddNew1').modal();
                 }else{
                 startPlayer(data.data.songs, id);
                 createPlayerSongList(data.data.songs);
                }
            }
            if(command === 'getPlaylistSongs2'){
              returnPlaylistSongs(data.data.songs);
              createPlayerSongList(data.data.songs);
            }
           }
         },
         error: function(err){
           alert('error');
         }
  });
  }

  function returnAllPlaylists($data){
    AllplaylistsData = $data;
  }
  function returnCurrentPlaylistData($data){
    currentPlaylistData = $data;
  }
  function returnPlaylistSongs($data){
    currentPlaylistSongs = $data;
  }

  function getAllPlaylists(){
    mainAjax('GET', './api/playlist','', 'getAllPlaylists');
  }

  function  getExistingPlaylist($playlistNumber){
    mainAjax('GET', './api/playlist/'+$playlistNumber,'', 'getExistingPlaylist');
  }

  function  getPlaylistSongs($playlistNumber){
    mainAjax('GET', './api/playlist/'+$playlistNumber+'/songs','', 'getPlaylistSongs', $playlistNumber);
  }

  function  getPlaylistSongs2($playlistNumber){
    mainAjax('GET', './api/playlist/'+$playlistNumber+'/songs','', 'getPlaylistSongs2', $playlistNumber);
  }

  function  createNewPlaylist($name, $image, $songs){
    var newPlaylistData = {'name': $name, 'image': $image, 'songs': $songs};
    mainAjax('POST', './api/playlist', newPlaylistData, 'createNewPlaylist');
  }

  function  updateExistingPlaylist($playlistNumber, $updateData){
    mainAjax('POST', './api/playlist/'+$playlistNumber , $updateData, 'updateExistingPlaylist');
  }

  function  updatePlaylistSongs($playlistNumber, $songs){
    mainAjax('POST', './api/playlist/'+$playlistNumber+'/songs', $songs, 'updatePlaylistSongs');
  }

  function  deleteExistingPlaylist($playlistNumber){
    mainAjax('DELETE', './api/playlist/'+$playlistNumber, '', 'deleteExistingPlaylist');
  }

  function populatePlaylists(){
    $('.playlistRow').html('');
    for (var i = 0; i < AllplaylistsData.length; i++) {
      $('.playlistRow').append("<div class = 'playlistWrapper col-md-2'></div>");
      $('.playlistWrapper').last().attr('id', 'plist_'+ AllplaylistsData[i].id);
      $('.playlistWrapper').last().append("<p class ='t1'>"+AllplaylistsData[i].name+"</p>");
      new CircleType($('.t1').last()[0]).radius(100);
      $('.playlistWrapper').last().append("<div class = 'imgWrapper'><img src = "+AllplaylistsData[i].image+" class = 'playlist'></img></div>");
      $('.imgWrapper').last().append("<button type = 'button' class ='btnRemove' name = 'button2' data-toggle='modal' data-target='modalDelete'></button>");
      $('.btnRemove').last().append("<span class = 'g1 glyphicon glyphicon-remove-circle remove'></span>");
      $('.imgWrapper').last().append("<button type = 'button' class ='btnEdit' name = 'button3' data-toggle='modal' data-target='modalAddNew1'></button>");
      $('.btnEdit').last().append("<span class = 'g1 glyphicon glyphicon-edit edit'></span>");
      $('.imgWrapper').last().append("<div class = 'center'>");
      $('.center').last().append("<span class = 'playButton glyphicon glyphicon-play play'></span>");
    };
    $("body").on("click",".btnRemove",function(){
        playerDeleteFlag=false;
        var cPlaylist = $(this).closest('.playlistWrapper').attr('id');
        cPlaylist = cPlaylist.split('_');
        globalId = cPlaylist[1];
        $('#modalDelete').modal();

    });
  };

  function search(){
    var nameToCheck='';
    if ($('#searchInput').val().length >= 2) {
      for (var i = 0; i < AllplaylistsData.length; i++) {
        nameToCheck = AllplaylistsData[i].name;
        if (nameToCheck.includes($('#searchInput').val())){
          $("div[aria-label='"+nameToCheck+"']").parent().parent().show();
        }else{
          $("div[aria-label='"+nameToCheck+"']").parent().parent().hide();
        }
      }
    }else{
      $('.playlistWrapper').show();
    }
  }

  function editPlaylist(id){
    editPressed = true;
    getPlaylistSongs(id);
  }

  function createPlayerSongList(songs){
    $('#songList').html('');
    for (var i = 0; i < songs.length; i++) {
      $('#songList').append("<li>"+songs[i].name+"</li>");
    }
    $('li:first').addClass('active');
    if(playerEditFlag){
      $('audio').attr('src', songs[0].url);
      $('audio')[0].load();
      $('audio')[0].play();
    }
    $('body').on('click', 'li', function(){
      var index = $(this).index();
      $('audio').attr('src', songs[index].url);
      $('audio')[0].load();
      $('audio')[0].play();
      $(this).addClass('active');
      $(this).siblings().removeClass('active');
    });
    $('audio')[0].onended = function(){
      var index = $('.active').index();
      var nextSong = (index != songs.last()) ? $('li')[index+1] : $('li')[0];
      var nextSource = (index != songs.last()) ? songs[index+1].url : songs[0].url;
      $(nextSong).addClass('active');
      $(nextSong).siblings().removeClass('active');
      $('audio').attr('src', nextSource);
      $('audio')[0].load();
      $('audio')[0].play();
    }
  }

  function startPlayer(songs,id){
    var playlist = AllplaylistsData.filter(function(y){
                    return y.id == id;
                    });
    $('#target').html('');
    $('#target').append("<div id = 'playerRow'></div>");
    $('#playerRow').append("<div class = 'playerWrapper'></div>");
    $('.playerWrapper').append("<img class = 'playerImage'></img>");
    $('.playerImage').attr('src', playlist[0].image);
    $('.playerWrapper').append("<div id = 'center2' class = 'center'></div>");
    $('#center2').append("<span class = ' pause glyphicon glyphicon-pause'></span>");
    $('#center2').append("<span id = 'play' class = ' glyphicon glyphicon-play'></span>");
    $('#play').hide();
    $('.playerWrapper').append('<audio></audio>');
    $('audio').attr('id','d4');
    $('audio').attr('src', songs[0].url);
    var audioElement = $('#d4')[0];
    audioElement.controls = true;
    audioElement.autoplay = true;
    $('#d4')[0].onplay = function() {
      $('.playerImage').css('animation-play-state', 'running');
        $('#play').hide();
        $('.pause').show();
      };
      $('#d4')[0].onpause = function() {
        $('.playerImage').css('animation-play-state', 'paused');
          $('.pause').hide();
          $('#play').show();
        };
    $('.playerWrapper').append("<ol id = 'songList'></ol>");
    $('.playerWrapper').append("<span id ='playerEdit' class ='glyphicon glyphicon-edit'></span>");
    $('.playerWrapper').append("<span id ='playerRemove' class ='glyphicon glyphicon-remove-circle'></span>");
    };

  function startPlaylist(currentPlaylist){
    getPlaylistSongs(currentPlaylist);
  };

  function addNewSongRow(numberOfRows){
    for (var i = 0; i < numberOfRows; i++) {
    $('#songsRow').append(`<p><input class = 's1 form-control songURL' placeholder='Song URL' pattern = '(http://)?(www)?[-a-zA-Z0-9@:%_\+.~#?\/=]+\.mp3' required>
                           <input class = 's1 form-control songName' placeholder='Song Name' required></p>`);
    }
  }

  //events
  $('body').on('click', '#btnDel', function(){
    var playlistToDelete = (playerDeleteFlag) ? globalId2: globalId;
    deleteExistingPlaylist(playlistToDelete);
    if(playerDeleteFlag){
      $('audio')[0].stop();
      $('#playerRow').hide();
      $('.playlistRow').css('margin-top', '0px');
    }
    getAllPlaylists();
  });

  $('body').on('click','.playButton',function(){
    editPressed=false;
    $('#playerRow').show();
    $('.playlistRow').css('margin-top', '300px');
    var cPlaylist = $(this).closest('.playlistWrapper').attr('id');
    cPlaylist = cPlaylist.split('_');
    globalId2= cPlaylist[1];
    startPlaylist(cPlaylist[1]);
  });


  $('body').on('click', '#btnAddSongs', function(){
    addNewSongRow(1);
  });

  $('body').on('click', '#btnSave', function(){
    var invalids =[];
    invalids = $("#form2").find('input:invalid');
    if(invalids.length === 0){
      $('#modalAddNew2').modal('hide');
      var nameToSend = $('#playlistName').val();
      var urlToSend = $('#playlistURL').val();
      var songsToSend = [];
      for (var i = 0; i < $('.songURL').length; i++) {
        if(($('.songURL')[i].value && $('.songName')[i].value) != ''){
        songsToSend.push({url: $('.songURL')[i].value, name: $('.songName')[i].value});
        }
      }
      if(!editPressed){
        createNewPlaylist(nameToSend,urlToSend,songsToSend);
      }else{
        var playlistInfo = {name: nameToSend, image: urlToSend};
        if(!playerEditFlag){
          updateExistingPlaylist(globalId, playlistInfo);
          updatePlaylistSongs(globalId, songsToSend);
        }else{
          updateExistingPlaylist(globalId2, playlistInfo);
          updatePlaylistSongs(globalId2, songsToSend);
        }
      }
    };
  });

  $('body').on('click', '#addNewPlaylist', function(){
    editPressed = false;
    $('#modalAddNew1').find('.modal-title').html('Add new playlist');
    $('#modalAddNew2').find('.modal-title').html('Add Songs');
    $('#modalAddNew2').find('#btnSave').html('Save & Finish');
    $('#playlistName').val('');
    $('#playlistURL').val('');
    $('#songsRow').html('');
    addNewSongRow(3);
  });

  $('body').on('keyup', '#playlistURL', function(){
   var source = $('#playlistURL').val();
   $('#preview').attr('src', source);
  });

  $('body').on('click', '.btnEdit', function(){
    playerEditFlag=false;
    var id = $(this).closest('.playlistWrapper').attr('id');
    id = id.split('_')[1];
    globalId= id;
    editPlaylist(id);
  });

  $('body').on('keyup', '#searchInput', search);

  $('body').on('click', '#btnNext', function(){
    var invalids =[];
    invalids = $("#form1").find('input:invalid');
    if(invalids.length === 0){
      $('#modalAddNew1').modal('hide');
      $('#modalAddNew2').modal();
    };
  });

  $('body').on('click', '.pause', function(){
    $('.playerImage').css('animation-play-state', 'paused');
    $('.pause').hide();
    $('#play').show();
    $('audio')[0].pause();
  });

  $('body').on('click', '#play', function(){
    $('.playerImage').css('animation-play-state', 'running');
    $('#play').hide();
    $('.pause').show();
    $('audio')[0].play();
  });

  $('body').on('click', '#playerEdit', function(){
    playerEditFlag=true;
    id = globalId2;
    editPlaylist(id);
  });

  $('body').on('click', '#playerRemove', function(){
    playerDeleteFlag=true;
    id = globalId2;
    $('#modalDelete').modal();
  });

  $("form").submit(function(e){
    e.preventDefault();
  });
});

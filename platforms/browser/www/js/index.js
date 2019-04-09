$(document).ready(function(){

	url = "http://productoswebs.com/mycer/backend/funciones.php";

    
	$('#btnLogin').click(function(){

		form = $(this).parents("#LoginForm");
        check = checkCampos(form);
        if(check) {
            formData = $('#LoginForm').serialize()
            $.ajax({

            type: "POST",
            url: url,
            cache: false,
            data: formData,
            success: function(resp){              
                if(resp=='NOLOGUEO'){
                    swal("Usario o Contraseña incorrecta");           
                }else{

                    session=resp.split("/")
                    localStorage.setItem("NOMBRE", session[0])
                    localStorage.setItem("SESSION", session[1])
                    localStorage.setItem("ROL", session[2])
                    nombre=localStorage.getItem("NOMBRE")
                    session=localStorage.getItem("SESSION")
                    rol=localStorage.getItem("ROL")

                    if(rol=='ADMIN' || rol=='EMPLE'){
                        $("#newCarbtn").hide();
                    }else{
                        $("#newCarbtn").hide();
                    }

                    $.mobile.changePage("#holaUsu", {reloadPage:false});
                    $("#contenBien").html("<h1>HOLA!</h1><h1>"+nombre+"!</h1>");
                   
                    setTimeout(function(){ $.mobile.changePage("#inicio", {reloadPage:false}); }, 3000);
                    inicioC();
                    
                }   
            },
            error: function(e){
                swal("NO se pudo completar la accion"+e)
            }
        })
            
        }
        else {
            swal("Debe deligenciar usuario y password")
        }

	});

    $('#opcionSelec').change(function(eve){ 

        if(this.value=='Administracion'){
            $.mobile.changePage("#registroAdmin", {reloadPage:false});
        }else if(this.value=='Usuario'){
            $.mobile.changePage("#registroUsuario", {reloadPage:false});
        }else if(this.value=='Empleado'){
            $.mobile.changePage("#registroEmpleado", {reloadPage:false});
        }   
    }); 

    $('#btn-siguiente').click(function(){
        form = $(this).parents("#registrer1");
        check = checkCampos(form);
        if(check) {
            $("#nitUsu").val($("#nit").val());
            swal({showConfirmButton: false, title: "Procesando..",imageUrl: "js/sweetalert/loading.gif",imageWidth: 1800, imageHeight: 1200});
            formData = $('#registrer1').serialize()
            $.ajax({
                type: "POST",
                url: url,
                cache: false,
                data: formData,
                success: function(resp){ 
                    swal.close();
                    $.mobile.changePage("#registroUsu", {reloadPage:false});
                }

            });
        }else{
            swal("Debe diligenciar todos los campos!");
        }
    });

    $('#btn-siguiente2').click(function(){
        form = $(this).parents("#registrerUsuAdmin");
        check = checkCampos(form);
        if(check) {
            swal({showConfirmButton: false, title: "Procesando..",imageUrl: "js/sweetalert/loading.gif",imageWidth: 1800, imageHeight: 1200});
            formData = $('#registrerUsuAdmin').serialize()
            $.ajax({
                type: "POST",
                url: url,
                cache: false,
                data: formData,
                success: function(resp){ 
                    
                    $respuesta=resp.split("-");

                    if($respuesta[0]=='error'){
                        swal({title: "Ups!", text:$respuesta[1]});
                    }else{
                        swal({title: "Muy Bien!",text: "Se creo usuario! \n"+resp,icon: "success"});
                        $.mobile.changePage("#iniciologin", {reloadPage:false});
                    }
                   
                }

            });
        }else{
            swal("Debe diligenciar todos los campos!");
        }
    });


    $('#btn-siguiente3').click(function(){
        form = $(this).parents("#registrerUsu");
        check = checkCampos(form);
        if(check) {
            swal({showConfirmButton: false, title: "Procesando..",imageUrl: "js/sweetalert/loading.gif",imageWidth: 1800, imageHeight: 1200});
            formData = $('#registrerUsu').serialize()
            $.ajax({
                type: "POST",
                url: url,
                cache: false,
                data: formData,
                success: function(resp){ 
                    
                    $respuesta=resp.split("-");

                    if($respuesta[0]=='error'){
                        swal({title: "Ups!", text:$respuesta[1]});
                    }else{
                        swal({title: "Muy Bien!",text: "Se creo usuario! \n"+resp,icon: "success"});
                        $.mobile.changePage("#iniciologin", {reloadPage:false});
                    }
                   
                }

            });
        }else{
            swal("Debe diligenciar todos los campos!");
        }
    });

     $('#btn-siguiente4').click(function(){
        form = $(this).parents("#registrerEmple");
        check = checkCampos(form);
        if(check) {
            swal({showConfirmButton: false, title: "Procesando..",imageUrl: "js/sweetalert/loading.gif",imageWidth: 1800, imageHeight: 1200});
            formData = $('#registrerEmple').serialize()
            $.ajax({
                type: "POST",
                url: url,
                cache: false,
                data: formData,
                success: function(resp){ 
                    $respuesta=resp.split("-");

                    if($respuesta[0]=='error'){
                        swal({title: "Ups!", text:$respuesta[1]});
                    }else{
                        swal({title: "Muy Bien!",text: "Se creo usuario! \n"+resp,icon: "success"});
                        $.mobile.changePage("#iniciologin", {reloadPage:false});
                    }
                   
                }

            });
        }else{
            swal("Debe diligenciar todos los campos!");
        }
    });

    $('#myperfil').click(function(){

            session=localStorage.getItem("SESSION");
            parametros = {"funcion" : 'cargarPerfil', "login":session}
            $.ajax({

                type: "POST",
                url: url,
                cache: false,
                data: parametros,
                success: function(resp){                  
                  $('#main-content2').html(resp).trigger('create');  
                },
                error: function(){
                    alert("NO se pudo completar la accion")
                }
            })

     }) ;

    $('#newCarbtn').click(function(){

            session=localStorage.getItem("SESSION");
            $('#newCar')[0].reset();
            parametros = {"funcion" : 'newCar', "login":session}
            $.ajax({

                type: "POST",
                url: url,
                cache: false,
                data: parametros,
                success: function(resp){                  
                  $('#contentNwecar1').html(resp).trigger('create');  
                },
                error: function(){
                    alert("NO se pudo completar la accion")
                }
            })

     }) ;

    $('#newCarFin').click(function(){
        session=localStorage.getItem("SESSION");
        $("#sessioU").val(session);
        
        swal({showConfirmButton: false, title: "Procesando..",imageUrl: "js/sweetalert/loading.gif",imageWidth: 1800, imageHeight: 1200});
        formData = $('#newCar').serialize()
        $.ajax({
            type: "POST",
            url: url,
            cache: false,
            data: formData,
            success: function(resp){                    
                alert(resp);
                $respuesta=resp.split("-");

                if($respuesta[0]=='error'){
                    swal({title: "Ups!", text:$respuesta[1]});
                }else{
                    swal({title: "Muy Bien!",text: "Se creo vehiculo! \n",icon: "success"});
                    $.mobile.changePage("#inicio", {reloadPage:false});
                }
               
            }

        });
        
    });
    
   
});



function inicioC(){
    session=localStorage.getItem("SESSION");
    rol=localStorage.getItem("ROL");
    parametros = {"funcion" : 'inicioLis', "login":session, "rol":rol}
    $.ajax({

        type: "POST",
        url: url,
        cache: false,
        data: parametros,
        success: function(resp){                  
           $('#main-content1').html(resp).trigger('create');  
        },
        error: function(){
            alert("NO se pudo completar la accion")
        }
    })
}
function detalleAutomovil(id){
    session=localStorage.getItem("SESSION");
    rol=localStorage.getItem("ROL");
    parametros = {"funcion" : 'detalleAuto', "login":session, "idAuto":id, "rol":rol}
    $.ajax({
        type: "POST",
        url: url,
        cache: false,
        data: parametros,
        success: function(resp){                  
           $('#main-detalle').html(resp).trigger('create');  
        },
        error: function(){
            alert("NO se pudo completar la accion")
        }
    })
}

function validarModelo(id){
    parametros = {"funcion" : 'validarModelo', "idMarca":id}
    $.ajax({
        type: "POST",
        url: url,
        cache: false,
        data: parametros,
        success: function(resp){                  
          $('#modeloSel').html(resp).trigger('create');  
        },
        error: function(){
            alert("NO se pudo completar la accion")
        }
    })
}

function meinteresa(id){
     session=localStorage.getItem("SESSION");
     parametros = {"funcion" : 'cotizacion', "idCot":id, "session":session}

    $.ajax({
        type: "POST",
        url: url,
        cache: false,
        data: parametros,
        success: function(resp){                  
          $('#main-cotizacion').html(resp).trigger('create');  
        },
        error: function(){
            alert("NO se pudo completar la accion")
        }
    })
    
}

function facturar(){
     var idcar = $('#id_carroW').val();
     var cedula = $('#cedula4').val();
     var direccion = $('#direccion4').val();
     var telefono = $('#telefono4').val();
     var correo = $('#correo4').val();
     var nombre = $('#nombre4').val();
     var iva = $('#iva').val();
     var valor = $('#valorV').val();

     $('#iframew2').attr("src", "http://productoswebs.com/mycer/backend/contacto.php?id_car="+idcar+"&cedula="+cedula+"&direccion="+direccion+"&telefono="+telefono+"&correo="+correo+"&nombre="+nombre+"&iva="+iva+"&valor="+valor)
     $.mobile.changePage("#iframeFac", {reloadPage:false});

     setTimeout(function(){  window.open('http://productoswebs.com/mycer/backend/facturas/'+idcar+'.pdf',  '_system', 'location=no'); }, 5000);     
    
}

function EnviarCoti(){
        
            swal({showConfirmButton: false, title: "Procesando..",imageUrl: "js/sweetalert/loading.gif",imageWidth: 1800, imageHeight: 1200});
            formData = $('#cotizacionF').serialize()
            $.ajax({
                type: "POST",
                url: url,
                cache: false,
                data: formData,
                success: function(resp){ 
                   
                    $respuesta=resp.split("-");

                    if($respuesta[0]=='error'){
                       swal({title: "Ups!", text:$respuesta[1]});
                    }else{
                        swal({title: "Muy Bien!",text: "Se enviò cotizaciòn! \n  Revisa en tu correo spam",icon: "success"});
                       
                    }
                   
                }

            });
        
        }



function checkCampos(obj) {

    var camposRellenados = true;
    obj.find("input").each(function() {
    var $this = $(this);
            if( $this.val().length <= 0 ) {
                camposRellenados = false;
                return false;
            }
    });
    if(camposRellenados == false) {
        return false;
    }
    else {
        return true;
    }
}


function hacerFoto(){
    navigator.camera.getPicture(onSuccess, onFail, { quality: 90, destinationType: Camera.DestinationType.FILE_URI , allowEdit: true,  popoverOptions: CameraPopoverOptions, saveToPhotoAlbum: false});
}

var pictureSource;   // picture source
    var destinationType; // sets the format of returned value
    document.addEventListener("deviceready",onDeviceReady,false);
    function onDeviceReady() {
        pictureSource=navigator.camera.PictureSourceType;
        destinationType=navigator.camera.DestinationType;
    }
function getPhoto(source){
  
   navigator.camera.getPicture(onSuccess, onFail, { quality: 50,destinationType: destinationType.FILE_URI,sourceType: source});
}
            
function onSuccess(imageURI) {
    var image = document.getElementById('imgPho');
    image.src = imageURI;
    subirImagen(imageURI)                             
}
        
function onFail(message) {
    alert('Failed because: ' + message);
}
            
function subirImagen(fileURL) {

    var options = new FileUploadOptions();
    options.fileKey = "file";
    options.fileName = fileURL.substr(fileURL.lastIndexOf('/') + 1);
    session=localStorage.getItem("SESSION")
    var params = new Object();
    params.session = session              
    options.params = params;
    var ft = new FileTransfer();
    ft.upload(fileURL, encodeURI("http://productoswebs.com/mycer/backend/UpFile.php"), uploadSuccess, uploadFail, options);
}

function uploadSuccess(r) {
  
}

function uploadFail(error) {
    //alert("An error has occurred: Code = " + error.code+ " upload error source " + error.source+" upload error target " + error.target);
}

function setTextColor(picker) {
        document.getElementsByTagName('body')[0].style.color = '#' + picker.toString()
    }
      
 function validarEstado(val){
        if(val=='NUEVO'){
            $('#labplaca').html('No Registro');
        }else{
            $('#labplaca').html('No Placa');
        }
 }   


function hacerFoto2(a,b){
    $("#nombreD").val(a);
    $("#idcarpeta").val(b);     
    navigator.camera.getPicture(onSuccess2, onFail, { quality: 90, destinationType: Camera.DestinationType.FILE_URI , allowEdit: true,  popoverOptions: CameraPopoverOptions, saveToPhotoAlbum: false});
}  

function onSuccess2(imageURI) {
  var nombre = $("#nombreD").val(); 
  var idCarpeta = $("#idcarpeta").val();  
  var image = document.getElementById(nombre);
  image.src = imageURI;
  subirImagen2(imageURI, nombre, idCarpeta)       
         
}

function subirImagen2(fileURL, nombre, idCarpeta) {

    var options = new FileUploadOptions();
    options.fileKey = "file";
    options.fileName = fileURL.substr(fileURL.lastIndexOf('/') + 1);
    session=localStorage.getItem("SESSION")
    var params = {};
    params.sess = session;  
    params.idCar = idCarpeta;  
    params.nomb = nombre;              
    options.params = params;
    var ft = new FileTransfer();
    ft.upload(fileURL, encodeURI("http://productoswebs.com/mycer/backend/Upfile2.php"), uploadSuccess, uploadFail, options);
}


function relodIMg(id, ruta){
    var url = ruta+'?rnd='+Math.random();
     $('#'+id).attr('src',url);

}


function downloadAndOpenPDF(url) {
    window.open('http://productoswebs.com/mycer/backend/facturas/1.pdf',  '_system', 'location=no');
}
        


window.onerror = function(err,fn,ln) {alert("ERROR:" + err + ", " + fn + ":" + ln );};
   

objects =[];
video = "";
status="";

function preload(){
    video = createVideo('video.mp4');
    video.hide();
}
function setup(){
    canvas = createCanvas(480,380);
    canvas.center();
}

function draw(){
    image(video, 0, 0, 480, 380);
        if(status !="")
        {
            objectDetector.detect(video, gotResult);

            for(i=0; i<objects.lenght; i++){
                document.getElementById("status").innerHTML = "Estado: Objetos Detectados";
                document.getElementById("number_of_objects").innerHTML = "Numéros de objetos detectados = "+ objects.lenght;

                fill("#FF0000");
                percent = floor(objects[i].confidence*100);
                text(objects[i].label + " " + percent + "%" + objects[i].x + 15, objects[i].y + 15);
                noFill();
                stroke("#FF0000");
                rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
            }
        }
}

function start(){
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Estado: Detectando objetos";
}

function modelLoaded(){
    console.log("Modelo cargado!");
    status = true;
    video.loop();
    video.speed(1);
    video.volume(0);
}

function gotResult(error, results)
{
    if (error){
        console.log(error);
    }
    console.log(results);
    objects=results;
}


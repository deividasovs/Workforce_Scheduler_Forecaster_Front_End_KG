const RotaViewer = ({ rotaFile }: { rotaFile: any }) => {
    // display the rota csv file in a table

    console.log(rotaFile)

    /*
    Display this file

    Mon,Tue,Wed,Thurs,Fri,Sat,Sun
worker 0,11:00-16:00,09:00-15:00,Off,Off,15:00-20:00,11:00-16:00,15:00-20:00
worker 1,15:00-20:00,Off,15:00-20:00,11:00-16:00,Off,15:00-20:00,11:00-16:00
worker 2,Off,Off,11:00-16:00,15:00-20:00,11:00-16:00,11:00-16:00,09:00-15:00
worker 3,Off,15:00-20:00,09:00-15:00,09:00-15:00,09:00-15:00,09:00-15:00,Off
worker 4,09:00-15:00,09:00-15:00,09:00-15:00,09:00-15:00,09:00-15:00,Off,Off
worker 5,09:00-15:00,11:00-16:00,09:00-15:00,09:00-15:00,09:00-15:00,Off,Off

    */



    return (
        <div>
            <h1>Rota Viewer</h1>
        </div>
    )
}

export { RotaViewer }
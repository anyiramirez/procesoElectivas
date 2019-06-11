export class DatosSimca {
    constructor( 
        Usuario:string,
        CreditosAprobados:any,
        CreditosPensum:any,
        PorcentajeCarrera:any,
        PromedioCarrera:any,
        ElectivasAprobadas:String,
        ElectivasCursadas: String,
        PageActual:any
        ){
        this.Usuario = Usuario;
        this.CreditosAprobados = CreditosAprobados ;
        this.CreditosPensum = CreditosPensum;
        this.PorcentajeCarrera=PorcentajeCarrera;
        this.PromedioCarrera = PromedioCarrera;
        this.ElectivasAprobadas = ElectivasAprobadas;
        this.ElectivasCursadas = ElectivasCursadas;
        this.PageActual=PageActual
        
        
    }

    Usuario:string;
    CreditosAprobados:any;
    CreditosPensum?:any;
    PorcentajeCarrera?:any;
    PromedioCarrera:String;
    ElectivasAprobadas: String;
    ElectivasCursadas: String;
    DebeVer: String;
    PageActual:any
    
     
}

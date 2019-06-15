export class DatosSimca {
    constructor( 
        Usuario:string,
        CreditosAprobados:any,
        CreditosPensum:any,
        PorcentajeCarrera:any,
        PromedioCarrera:any,
        ElectivasAprobadas:String,
        ElectivasCursadas: String
    
        ){
        this.Usuario = Usuario;
        this.CreditosAprobados = CreditosAprobados ;
        this.CreditosPensum = CreditosPensum;
        this.PorcentajeCarrera=PorcentajeCarrera;
        this.PromedioCarrera = PromedioCarrera;
        this.ElectivasAprobadas = ElectivasAprobadas;
        this.ElectivasCursadas = ElectivasCursadas;
        
        
    }

    Usuario:string;
    CreditosAprobados:any;
    CreditosPensum?:any;
    PorcentajeCarrera?:any;
    PromedioCarrera:String;
    ElectivasAprobadas: String;
    ElectivasCursadas: String;
    DebeVer: String;
    
     
}

class User {
    constructor (id,NombreCompleto, correo, foto, ultAcc) {
      this.id = id;
      this.NombreCompleto = NombreCompleto;
      this.correo = correo;
      this.foto = foto;
      this.ultAcc = ultAcc;
      this.fcreacion = Date.now();
    }
}
module.exports = User;
    
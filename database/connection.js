export class DBConnection {

  constructor(caller) {
    let self = this;
    this.caller = caller;

    this.getAllVolumes = function() {
      let sql = `SELECT * FROM box`;
      this.sendQuery('get', sql, this.returnAllVolumes);
    }

    this.returnAllVolumes = function(result) {
      let volumes = JSON.parse(result);
      self.caller.displayVolumes(volumes);
    }

    this.saveVolumeBox = function(volumeBox, data) {
      let sql = `INSERT INTO box(id, position_x, position_y, position_z, scale_x, scale_y, scale_z, rotation_x, rotation_y, rotation_z, material_id, prop1)
      VALUES ('` + volumeBox.uuid +`', ` + volumeBox.position.x +`, ` + volumeBox.position.y +`, ` + volumeBox.position.z +`, ` + volumeBox.scale.x +`, ` + volumeBox.scale.y +`, ` + volumeBox.scale.z +`, ` + volumeBox.rotation.x +
      `, ` + volumeBox.rotation.y +`, ` + volumeBox.rotation.z +`, ` + volumeBox.material +`, ` + volumeBox.prop + `)
      ON DUPLICATE KEY UPDATE
      id = '` + volumeBox.uuid +`', position_x = ` + volumeBox.position.x +`, position_y = ` + volumeBox.position.y +`, position_z = ` + volumeBox.position.z +`, scale_x = ` + volumeBox.scale.x +`, scale_y = ` + volumeBox.scale.y +`, scale_z = ` + volumeBox.scale.z +
      `, rotation_x = ` + volumeBox.rotation.x +`, rotation_y = ` + volumeBox.rotation.y +`, rotation_z = ` + volumeBox.rotation.z +`, material_id = ` + volumeBox.material +`, prop1 = ` + volumeBox.prop ;
      console.log(sql);
      this.sendQuery('set', sql);
    }

    this.deleteVolumeBox = function(volumeBox) {
      let sql = `DELETE FROM box WHERE id = '` + volumeBox.uuid +`'`;
      console.log(sql);
      this.sendQuery('set', sql);
    }

    this.sendQuery = function(type, sql, callback = null) {
      if (window.XMLHttpRequest) {
        // code for IE7+, Firefox, Chrome, Opera, Safari
        var xmlhttp = new XMLHttpRequest();
      } else {
        // code for IE6, IE5
        var xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
      }
      xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
          if (type === 'get' && callback != null) {
            callback(this.responseText);
          }
          else {
            console.log(this.responseText);
          }
        }
      };
      xmlhttp.open("GET", "../database/connection.php?sql=" + sql, true);
      xmlhttp.send();
    }
  }
}

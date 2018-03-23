data = {
  maindata: [
    {},
    {
      UnitList: "CH1A, E1, E8",
      apt_no: "",
      call_category: "STILL ALARM",
      call_description: "STILL ALARM",
      call_type: "801",
      cfs_no: "18000010520",
      cfs_remark: "LOW HANGING CABLE/TELEPHONE WIRE ABOUT 5 FT OFF GROUND. ",
      city: "Greenwich",
      dispatch_fire: "2018-03-23T11:41:15",
      latitude: "41.0561\r",
      location: "00536  LAKE AV",
      longitude: "-73.6401\r",
      premise_name: "536 BUSH AV",
      priority_amb: "",
      priority_fire: "FD Pri:1",
      priority_pol: "PD Pri:1",
      test_call: "true",
      rec_dt: "03-23-2018 15:43:46.924 + 00:00",
      x_street_name: " Map -I16 ROCKWOOD LN&ROUND HILL RD",
      zip: "06830"
    }
  ]
}

module.exports = data;

/*
PRE-POSTGRES-WRITE: 03-23-2018 02:47:42 :: [object Object]
Executing (default): INSERT INTO "calls" ("call_id","assignment","radio_freq","apt_no","call_category","call_description","call_type","cfs_no","cfs_remark","city","dispatch_fire","latitude","location","longitude","premise_name","priority_amb","priority_fire","priority_pol","timeout","cross_street","map_ref","zip","test_call","slug","created_at","updated_at") VALUES (DEFAULT,'E1  E8','CH1A','','STILL ALARM','STILL ALARM','801',1800010520,'LOW HANGING CABLE/TELEPHONE WIRE ABOUT 5 FT OFF GROUND. ','Greenwich','2018-03-23T11:41:50.677','41.0561^M','00536  LAKE AV','-73.6401^M','536 LAKE AVE','','FD Pri:1','PD Pri:1','03-23-2018 11:41:15','ROCKWOOD LN&ROUND HILL RD',' Map -I16','06830',false,'jy98kmc','2018-03-23 15:43:46.924 +00:00','2018-03-23 15:43:46.924 +00:00') RETURNING *;
Successful write to Postgres:  03-23-2018 02:47:42
*/

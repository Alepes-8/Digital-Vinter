const authorization = require('./authorization').pool;
var async = require("async");



/* Functions in the DB class that is usable by other files */
module.exports = {
    /*
    ALL FUNCTIONS SHOULD RETURN SOMETHING
    If status, see specific one at
    https://developer.mozilla.org/en-US/docs/Web/HTTP/Status
    */


    // GET FRICTION DATA
    getFrictionData : function(req, res, next, reporter){
       
        // ssh to database server and then connect to db
        // mysqlssh.connect(auth.ssh, auth.database).then(client => {
        
        authorization.getConnection(function(err, conn){
            if (err) throw err

            const sql =`
                SELECT
                    t.id,
                    t.MeasureTimeUTC,
                    t.ReportTimeUTC,
                    t.Latitude,
                    t.Longitude,
                    t.RoadCondition,
                    t.MeasurementType,
                    t.NumberOfMeasurements,
                    t.MeasurementValue, 
                    t.MeasurementConfidence,
                    t.MeasurementsVelocity,
                    t.ReporterOrganisation
                FROM friction_data t
                INNER JOIN(
                    SELECT
                        latitude,
                        longitude,
                        max(id) as MaxID
                    FROM friction_data
                    WHERE reporterOrganisation = ?
                    GROUP BY latitude, longitude
                ) tm ON t.latitude = tm.latitude and t.longitude = tm.longitude and t.id = tm.MaxID;`
            conn.query(sql, [reporter], function (err, results) {
                res.send(results);
                conn.release();
                if (err) throw err
            });

        });
    },
    // GET REPORTER ORGANIZATIONS (this query might be uneffective?)
    getDistinctReporterorgFriction : function(req, res, next){
            
        authorization.getConnection(function(err, conn){
            if (err) throw err
            
            const sql =`SELECT DISTINCT reporterorganisation FROM friction_data;`

            
            conn.query(sql, function (err, results) {
                // send data back to client
                res.send(results);
                conn.release();
                if (err) throw err
     
            });

        });
    },
    // GET ALL FRICTION DATA
    getAllFrictionData : function(req, res, next){
            
        authorization.getConnection(function(err, conn){
            if (err) throw err
            
            const sql =`SEELCT * FROM friction_data;`

            
            conn.query(sql, function (err, results) {
                // send data back to client
                res.send(results);
                conn.release();
                if (err) throw err
     
            });

        });
    },

     // Get friction data in a certain rectangle, probably used when drawing a rectangle on map
     getFrictionDataRect : function(req, res, next, reporter, SWlat, NElat, SWlon, NElon){
        
        authorization.getConnection(function(err, conn){
            if (err) throw err
            
            const sql =`
                SELECT * 
                FROM friction_data 
                WHERE reporterOrganisation = ? AND latitude BETWEEN ? AND ? AND longitude BETWEEN ? AND ?;`
            var values = [reporter, SWlat, NElat, SWlon, NElon];
            
            conn.query(sql, values, function (err, results) {
                // send data back to client
                res.send(results);
                conn.release();

                if (err) throw err
            });
        });



    },

     // Get friction data in a certain circle, probably used when drawing a circle on map
     getFrictionDataCirc : function(req, res, next, reporter, lat, lon, radius){
       

        authorization.getConnection(function(err, conn){
            if (err) throw err
            
            const sql =`SELECT * FROM friction_data a 
            WHERE (
                      acos(sin(a.latitude * 0.0175) * sin(? * 0.0175) 
                           + cos(a.latitude * 0.0175) * cos(? * 0.0175) *    
                             cos((? * 0.0175) - (a.longitude * 0.0175))
                          ) * 6371 <= ?
                  ) and ReporterOrganisation = ?;`

            var variablesql = [lat,lat,lon,(radius/1000),reporter];
            conn.query(sql, variablesql, function (err, results) {
                // send data back to client
                res.send(results);
                conn.release();

                if (err) throw err



            });
        });
    },

    getLatestFrictionData : function(req, res, next, friction_id){
        

           authorization.getConnection(function(err, conn){
            if (err) throw err
             
            let friction_data = [];
    
            const sql = "SELECT * FROM friction_data WHERE id = ?";

            // do a async loop through the station_id list
            async.each(friction_id, function(id, callback){

                // get latest row of station weather data
                const values =  [[id]];

                conn.query(sql, [values], function (err, results) {
                    
                    // convert timestamp and windspeed to wanted units
                    
                    friction_data.push(results);
                    callback();
                    
                })
            
            },function(callback){
                // when async functions are done send data back
                res.send(friction_data);
                conn.release();

                if (err) throw err

            });
         });
    }

};
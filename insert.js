function insert(dataToLog){
    // var timeZone = "GMT" //Session.getScriptTimeZone()
    // var timeZoneOffset = Math.floor((new Date().getTimezoneOffset())/60.)
    // var localTimeZone = Session.getScriptTimeZone()
    var address = '';
    var user = '';
    var userPwd = '';
    var db = '';
    var instanceUrl = 'jdbc:mysql://' + address;
    var dbUrl = instanceUrl + '/' + db;


    var conn = Jdbc.getConnection(dbUrl, user, userPwd);


    var stmt = conn.prepareStatement('INSERT INTO BoldPenguinReceived ' +
        '(apiKey, leadSource,external_id,lead_Id, business_name, customerName, firstName, lastName,actual_years_in_business, estimated_annual_revenue, estimated_annual_payroll, website,'+
        'years_of_experience, currently_insured,EIN, DUNS, full_time_employees, part_time_employees, completed_at, email, phone_number, alt_phone_number, address, city, state, zip, naics_code,'+
        'naics_description, coverage_types) '+
        'values (?, ?,?,?, ?, ?, ?, ?,?, ?, ?, ?,?, ?,?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?, ?) ');

    var dateSub = new Date(dataToLog.completed_at);
    Logger.log(dateSub)

    Logger.log(dataToLog.actual_years_in_business)

    if( dataToLog.ein == "undefined" || dataToLog.ein == null){
        dataToLog.ein=0;
    }
    if( dataToLog.duns == "undefined" || dataToLog.duns == null){
        dataToLog.duns=0;
    }
    if( dataToLog.alt_phone_number == "undefined" || dataToLog.alt_phone_number == null){
        dataToLog.alt_phone_number=0;
    }


    stmt.setString(1,dataToLog.key)                      // apiKey
    stmt.setString(2,dataToLog.source)                   // leadSource
    stmt.setString(3,dataToLog.external_id)              // externalID
    stmt.setString(4,dataToLog.lead_id)                  // lead_Id
    stmt.setString(5,dataToLog.business_name)            // business_name
    stmt.setString(6,dataToLog.name)                     // customerName
    stmt.setString(7,dataToLog.first_name)               // firstName
    stmt.setString(8,dataToLog.last_name)                // lastName
    stmt.setInt(9,dataToLog.actual_years_in_business)    // yrs in biz
    stmt.setInt(10,dataToLog.estimated_annual_revenue)   // annRev
    stmt.setInt(11,dataToLog.estimated_annual_payroll)   // ann payroll
    stmt.setString(12,dataToLog.website)                 // website
    stmt.setInt(13,dataToLog.years_of_experience)        // yrs in biz
    stmt.setBoolean(14,(dataToLog.currently_insured === 'true'))      // insured?
    stmt.setInt(15,dataToLog.ein)                        // EIN
    stmt.setInt(16,dataToLog.duns)                       // DUNS
    stmt.setInt(17,dataToLog.full_time_employees)        // FTEmployees
    stmt.setInt(18,dataToLog.part_time_employees)        // PTEployees
    stmt.setString(19,dataToLog.completed_at.replace(/[TZ]/g," "))            // Time Completed
    stmt.setString(20,dataToLog.email)                   // email
    stmt.setString(21,dataToLog.phone_number)            // phone number (primary)
    stmt.setString(22,dataToLog.alt_phone_number)        // Phone number (secondary)
    stmt.setString(23,dataToLog.address)                 // mailing address
    stmt.setString(24,dataToLog.city)                    // city
    stmt.setString(25,dataToLog.state)                   // state
    stmt.setString(26,dataToLog.zip)                     // zip
    stmt.setInt(27,dataToLog.naics_code)                 // NAICS
    stmt.setString(28,dataToLog.naics_description.slice(0,255))       // NAICS Description
    stmt.setString(29,dataToLog.coverage_types)          // coverage Types




//apiKey VARCHAR(255), leadSource VARCHAR(255), external_id VARCHAR(255), lead_Id VARCHAR(255), business_name VARCHAR(255), customerName VARCHAR(255), firstName VARCHAR(255), lastName VARCHAR(255),
//    actual_years_in_business INT(50), estimated_annual_revenue INT(50), estimated_annual_payroll INT(50), website VARCHAR(255), years_of_experience INT(50), currently_insured BOOLEAN,
//    EIN INT(50), DUNS INT(50), full_time_employees INT(50), part_time_employees INT(50), completed_at DATETIME, email VARCHAR(255), phone_number VARCHAR(255), alt_phone_number VARCHAR(255),
//    address VARCHAR(255), city VARCHAR(255), state VARCHAR(50), zip VARCHAR(50), naics_code INT(6), naics_description VARCHAR(255), coverage_types VARCHAR(255)



    stmt.addBatch();




    var batch = stmt.executeBatch();
    conn.close();

    return 'Success!';

}

module.exports = insert
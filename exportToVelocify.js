const axios = require('axios')

const exportToVelocify = (dataToExport, res) =>{

    if ( dataToExport.business_name == "undefined" || dataToExport.business_name == null){
        dataToExport.business_name='';
    }
    if ( dataToExport.first_name == "undefined" || dataToExport.first_name == null){
        dataToExport.first_name='';
    }
    if ( dataToExport.last_name == "undefined" || dataToExport.last_name == null){
        dataToExport.last_name='';
    }
    if ( dataToExport.website == "undefined" || dataToExport.website == null){
        dataToExport.website='';
    }
    if ( dataToExport.naics_description == "undefined" || dataToExport.naics_description == null){
        dataToExport.naics_description='';
    }
    if ( dataToExport.ein == "undefined" || dataToExport.ein == null){
        dataToExport.ein='';
    }

    var XMLString = '<BoldPenguin>' +
        '<external_id>'+dataToExport.lead_id+'</external_id>'+
        '<business_name>'+dataToExport.business_name.replace(/[\&]/g,"&amp;").replace(/[\"]/g,"&quot;").replace(/[\']/g,"&apos;")+'</business_name>'+
        '<first_name>'+dataToExport.first_name.replace(/[\&]/g,"&amp;").replace(/[\"]/g,"&quot;").replace(/[\']/g,"&apos;")+'</first_name>'+
        '<last_name>'+dataToExport.last_name.replace(/[\&]/g,"&amp;").replace(/[\"]/g,"&quot;").replace(/[\']/g,"&apos;")+'</last_name>'+
        '<actual_years_in_business>'+dataToExport.actual_years_in_business+'</actual_years_in_business>'+
        '<estimated_annual_revenue>'+dataToExport.estimated_annual_revenue+'</estimated_annual_revenue>'+
        '<estimated_annual_payroll>'+dataToExport.estimated_annual_payroll+'</estimated_annual_payroll>'+
        '<website>'+dataToExport.website.replace(/[\&]/g,"&amp;").replace(/[\"]/g,"&quot;").replace(/[\']/g,"&apos;")+'</website>'+
        '<years_of_experience>'+dataToExport.years_of_experience+'</years_of_experience>'+
        '<ein>'+dataToExport.ein+'</ein>'+
        '<full_time_employees>'+dataToExport.full_time_employees+'</full_time_employees>'+
        '<part_time_employees>'+dataToExport.part_time_employees+'</part_time_employees>'+
        '<email>'+dataToExport.email+'</email>'+
        '<phone_number>'+dataToExport.phone_number+'</phone_number>'+
        '<alt_phone_number>'+dataToExport.alt_phone_number+'</alt_phone_number>'+
        '<address>'+dataToExport.address+'</address>'+
        '<city>'+dataToExport.city+'</city>'+
        '<state>'+dataToExport.state+'</state>'+
        '<zip>'+dataToExport.zip+'</zip>'+
        '<naics_code>'+parseInt(dataToExport.naics_code)+'</naics_code>'+
        '<naics_description>'+dataToExport.naics_description.replace(/[\&]/g,"&amp;").replace(/[\"]/g,"&quot;").replace(/[\']/g,"&apos;")+'</naics_description>'+
        '</BoldPenguin>';

    console.log(XMLString)

    const url = 'https://secure.velocify.com/Import.aspx?Provider=BoldPenguin&Client=CommercialInsuranceNET&CampaignId=58&XmlResponse=true'
    var options = {
        method : 'post',
        url: url,
        contentType: 'application/xml',
        data: XMLString,
    };

    axios(options)
       .then(data => {
           console.log(data)
           res.send(data.data)
       })
       .catch( e => {
           console.log(e)
           res.send(e)
       })

}

module.exports = exportToVelocify

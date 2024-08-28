sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/m/MessageToast",
    "sap/m/MessageBox",
    "sap/ui/core/format/DateFormat"
],
function (Controller, JSONModel, MessageToast, MessageBox, DateFormat ) {
    "use strict";

    return Controller.extend("com.app.vendoreservations.controller.Home", {
        onInit: function () {
            this._initializeDatePicker();
        },
        generateUUID: function () {
            debugger
            return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
                var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
                return v.toString(16);
            });
        },
        createData: function (oModel, oPayload, sPath) {
            return new Promise(function (resolve, reject) {
              oModel.create(sPath, oPayload, {
                refreshAfterChange: true,
                success: function () {
                  resolve();
                },
                error: function (oError) {
                  reject(oError);
                }
              });
            });
          },
        _initializeDatePicker: function() {
            var oDatePicker = this.byId("_IDdateandtime");
            var currentDate = new Date();
            var minDate = new Date();
            minDate.setDate(currentDate.getDate() + 1); // Tomorrow
            var maxDate = new Date();
            maxDate.setDate(currentDate.getDate() + 3); // Three days after tomorrow
            
            oDatePicker.setMinDate(minDate);
            oDatePicker.setMaxDate(maxDate);
            oDatePicker.attachChange(this._validateDate, this);
        },
        // onSubmit: async function () {
        //     debugger;
        //     var oView = this.getView();
        //     var bValid = true;
        //     var sVehicleNumber = this.getView().byId("VehicleNo").getValue().toUpperCase();
        //     var sVendorName = this.getView().byId("VenderName").getValue();
        //     var sVendorNumber = this.getView().byId("VenderNo").getValue();
        //     var sDriverName = this.getView().byId("DriverName").getValue();
        //     var sDriverNumber = this.getView().byId("DriverNo").getValue();
        //     var sServiceType = this.getView().byId("trasportType").getSelectedKey();
        //     var sDate = this.getView().byId("_IDdateandtime").getDateValue();
        //     var oThis = this;
            
        //     // Validate Vehicle Number
        //     if (!sVehicleNumber || !/^[A-Za-z]{2}\d{2}[A-Za-z]{2}\d{4}$/.test(sVehicleNumber)) {
        //         oView.byId("VehicleNo").setValueState("Error").setValueStateText("Vehicle number should follow this pattern: AP12BG1234");
        //         bValid = false;
        //     } else {
        //         oView.byId("VehicleNo").setValueState("None");
        //     }

        //     // Validate Vendor Name
        //     if (!sVendorName) {
        //         oView.byId("VenderName").setValueState("Error").setValueStateText("Vendor Name is required");
        //         bValid = false;
        //     } else {
        //         oView.byId("VenderName").setValueState("None");
        //     }

        //     // Validate Vendor Mobile Number
        //     if (!sVendorNumber || sVendorNumber.length !== 10 || !/^\d+$/.test(sVendorNumber)) {
        //         oView.byId("VenderNo").setValueState("Error").setValueStateText("Vendor mobile number must be a 10-digit numeric value");
        //         bValid = false;
        //     } else {
        //         oView.byId("VenderNo").setValueState("None");
        //     }

        //     // Validate Driver Name
        //     if (!sDriverName) {
        //         oView.byId("DriverName").setValueState("Error").setValueStateText("Driver Name is required");
        //         bValid = false;
        //     } else {
        //         oView.byId("DriverName").setValueState("None");
        //     }

        //     // Validate Driver Mobile Number
        //     if (!sDriverNumber || sDriverNumber.length !== 10 || !/^\d+$/.test(sDriverNumber)) {
        //         oView.byId("DriverNo").setValueState("Error").setValueStateText("Driver mobile number must be a 10-digit numeric value");
        //         bValid = false;
        //     } else {
        //         oView.byId("DriverNo").setValueState("None");
        //     }

        //     // Validate Vehicle Type
        //     if (!sServiceType) {
        //         oView.byId("trasportType").setValueState("Error").setValueStateText("Vehicle type is required");
        //         bValid = false;
        //     } else {
        //         oView.byId("trasportType").setValueState("None");
        //     }
        //      // Validate Reservation Date
        //      if (!sDate) {
        //         oView.byId("_IDdateandtime").setValueState("Error").setValueStateText("Reservation time is required");
        //         bValid = false;
        //     } else {
        //         // Check if the selected date is within the allowed range
        //         var currentDate = new Date();
        //         var minDate = new Date();
        //         minDate.setDate(currentDate.getDate() + 1); 
        //         var maxDate = new Date();
        //         maxDate.setDate(currentDate.getDate() + 3); 
                
        //         if (sDate < minDate || sDate > maxDate) {
        //             oView.byId("_IDdateandtime").setValueState("Error").setValueStateText("Please select a date within the allowed range (next 3 days).");
        //             MessageBox.error("Please select a date within the allowed range (next 3 days).");
        //             bValid = false;
        //             return;
        //         } else {
        //             oView.byId("_IDdateandtime").setValueState("None");
        //         }
        //     }
            
        //     // Convert date to ISO 8601 format (only date part)
        //     var isoDate = sDate.toISOString().split('T')[0]; // 'YYYY-MM-DD'
            
        //     // Format the date as DD-MM-YYYY
        //     var day = ("0" + sDate.getDate()).slice(-2); // Add leading zero if needed
        //     var month = ("0" + (sDate.getMonth() + 1)).slice(-2); // Add leading zero if needed
        //     var year = sDate.getFullYear();
        //     var formattedDate = day + "-" + month + "-" + year; // 'DD-MM-YYYY'


        //     var oModel = this.getView().getModel();
        //     const Reservations = await new Promise((resolve, reject) => {
        //         oModel.read("/ZEWM_RESERVATIONS_DETAILSSet", {
        //             success: function (oData) {
        //                 resolve(oData.results);
        //             },
        //             error: function (oError) {
        //                 reject(oError);
        //             }
        //         });
        //     });
        //     // Check if the Vehicle Number already exists

        //     const bVehicleNumberExists = Reservations.some(Data => Data.Vehiclenumber === sVehicleNumber);
        //     if (bVehicleNumberExists) {
        //         MessageBox.error("Vehicle Number already existed!");
        //         return;  // Stop further execution
        //     }

        //     //UUID generator...
        //     var sUUID = this.generateUUID();
        //     const reservationModel = new sap.ui.model.json.JSONModel({
        //         Id: sUUID,
        //         Vendorname: sVendorName,
        //         Vendornumber: sVendorNumber,
        //         Drivername: sDriverName,
        //         Drivernumber: sDriverNumber,
        //         Vehiclenumber: sVehicleNumber,
        //         Servicetype: sServiceType,
        //         Reservedate: formattedDate,
        //         //Intime: new Date()
        //     });

        //     this.getView().setModel(reservationModel, "reservationModel");
        //     const oPayload = this.getView().getModel("reservationModel").getProperty("/");
        //     console.log("Payload: ", oPayload);

        //     try {
        //         await this.createData(oModel, oPayload, "/ZEWM_RESERVATIONS_DETAILSSet");
        //         MessageBox.success("Your reservation request sent Sucessfully!");

        //         // After successfully passing the test cases and created, the details will be cleared...
        //         this.getView().byId("VenderName").setValue("");
        //         this.getView().byId("VenderNo").setValue("");
        //         this.getView().byId("DriverName").setValue("");
        //         this.getView().byId("DriverNo").setValue("");
        //         this.getView().byId("VehicleNo").setValue("");
        //         this.getView().byId("trasportType").setSelectedKey("");
        //         this.getView().byId("_IDdateandtime").setValue("");
        //     } catch (error) {
        //         console.error("Error: ", error);
        //         MessageBox.error("Some technical issue");
        //     }
        // },
        onSubmit: async function () {
            debugger;
            var oView = this.getView();
            var bValid = true;
            var sVehicleNumber = this.getView().byId("VehicleNo").getValue().toUpperCase();
            var sVendorName = this.getView().byId("VenderName").getValue().toUpperCase();
            var sVendorNumber = this.getView().byId("VenderNo").getValue();
            var sDriverName = this.getView().byId("DriverName").getValue();
            var sDriverNumber = this.getView().byId("DriverNo").getValue();
            var sServiceType = this.getView().byId("trasportType").getSelectedKey();
            var sDate = this.getView().byId("_IDdateandtime").getDateValue();
            var oThis = this;
            
            // Validate Vehicle Number
            if (!sVehicleNumber || !/^[A-Za-z]{2}\d{2}[A-Za-z]{2}\d{4}$/.test(sVehicleNumber)) {
                oView.byId("VehicleNo").setValueState("Error").setValueStateText("Vehicle number should follow this pattern: AP12BG1234");
                bValid = false;
            } else {
                oView.byId("VehicleNo").setValueState("None");
            }
        
            // Validate Vendor Name
            if (!sVendorName) {
                oView.byId("VenderName").setValueState("Error").setValueStateText("Vendor Name is required");
                bValid = false;
            } else {
                oView.byId("VenderName").setValueState("None");
            }
        
            // Validate Vendor Mobile Number
            if (!sVendorNumber || sVendorNumber.length !== 10 || !/^\d+$/.test(sVendorNumber)) {
                oView.byId("VenderNo").setValueState("Error").setValueStateText("Vendor mobile number must be a 10-digit numeric value");
                bValid = false;
            } else {
                oView.byId("VenderNo").setValueState("None");
            }
        
            // Validate Driver Name
            if (!sDriverName) {
                oView.byId("DriverName").setValueState("Error").setValueStateText("Driver Name is required");
                bValid = false;
            } else {
                oView.byId("DriverName").setValueState("None");
            }
        
            // Validate Driver Mobile Number
            if (!sDriverNumber || sDriverNumber.length !== 10 || !/^\d+$/.test(sDriverNumber)) {
                oView.byId("DriverNo").setValueState("Error").setValueStateText("Driver mobile number must be a 10-digit numeric value");
                bValid = false;
            } else {
                oView.byId("DriverNo").setValueState("None");
            }
        
            // Validate Vehicle Type
            if (!sServiceType) {
                oView.byId("trasportType").setValueState("Error").setValueStateText("Vehicle type is required");
                bValid = false;
            } else {
                oView.byId("trasportType").setValueState("None");
            }
        
            // Validate Reservation Date
            if (!sDate) {
                oView.byId("_IDdateandtime").setValueState("Error").setValueStateText("Reservation time is required");
                bValid = false;
            } else {
                // Check if the selected date is within the allowed range
                var currentDate = new Date();
                var minDate = new Date();
                minDate.setDate(currentDate.getDate() + 1); 
                var maxDate = new Date();
                maxDate.setDate(currentDate.getDate() + 3); 
                
                if (sDate < minDate || sDate > maxDate) {
                    oView.byId("_IDdateandtime").setValueState("Error").setValueStateText("Please select a date within the allowed range (next 3 days).");
                    MessageBox.error("Please select a date within the allowed range (next 3 days).");
                    bValid = false;
                    return;
                } else {
                    oView.byId("_IDdateandtime").setValueState("None");
                }
            }
        
            // Check if the form is valid before proceeding
            if (!bValid) {
                return;
            }
            
            // Convert date to ISO 8601 format (only date part)
            var isoDate = sDate.toISOString().split('T')[0]; // 'YYYY-MM-DD'
            
            // Format the date as DD-MM-YYYY
            var day = ("0" + sDate.getDate()).slice(-2); // Add leading zero if needed
            var month = ("0" + (sDate.getMonth() + 1)).slice(-2); // Add leading zero if needed
            var year = sDate.getFullYear();
            var formattedDate = day + "-" + month + "-" + year; // 'DD-MM-YYYY'
        
            var oModel = this.getView().getModel();
            
            try {
                // Fetch existing reservations
                const Reservations = await new Promise((resolve, reject) => {
                    oModel.read("/ZEWM_RESERVATIONS_DETAILSSet", {
                        success: function (oData) {
                            resolve(oData.results);
                        },
                        error: function (oError) {
                            reject(oError);
                        }
                    });
                });
        
                // Check if the Vehicle Number already exists
                const bVehicleNumberExists = Reservations.some(Data => Data.Vehiclenumber === sVehicleNumber);
                if (bVehicleNumberExists) {
                    MessageBox.error("Vehicle Number already exists!");
                    return;  // Stop further execution if the vehicle number exists
                }
        
                // UUID generator
                var sUUID = this.generateUUID();
                const reservationModel = new sap.ui.model.json.JSONModel({
                    Id: sUUID,
                    Vendorname: sVendorName,
                    Vendornumber: sVendorNumber,
                    Drivername: sDriverName,
                    Drivernumber: sDriverNumber,
                    Vehiclenumber: sVehicleNumber,
                    Servicetype: sServiceType,
                    Reservedate: formattedDate,
                    // Intime: new Date()
                });
        
                this.getView().setModel(reservationModel, "reservationModel");
                const oPayload = this.getView().getModel("reservationModel").getProperty("/");
                console.log("Payload: ", oPayload);
        
                await this.createData(oModel, oPayload, "/ZEWM_RESERVATIONS_DETAILSSet");
                MessageBox.success("Your reservation request was sent successfully!");
        
                // Clear the form after successful submission
                this.getView().byId("VenderName").setValue("");
                this.getView().byId("VenderNo").setValue("");
                this.getView().byId("DriverName").setValue("");
                this.getView().byId("DriverNo").setValue("");
                this.getView().byId("VehicleNo").setValue("");
                this.getView().byId("trasportType").setSelectedKey("");
                this.getView().byId("_IDdateandtime").setValue("");
            } catch (error) {
                console.error("Error: ", error);
                MessageBox.error("Some technical issue occurred.");
            }
        },        
        onCancelSubmit: function () {
            this.byId("VenderName").setValue("");
            this.byId("VenderNo").setValue("");
            this.byId("DriverName").setValue("");
            this.byId("DriverNo").setValue("");
            this.byId("_IDdateandtime").setValue("");
            this.byId("VehicleNo").setValue("");
            this.byId("trasportType").setSelectedKey("");
        }
    });
});

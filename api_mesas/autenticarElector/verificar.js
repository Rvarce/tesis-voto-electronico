var edge = require('edge-js');
var path = require('path')
var Elector = require('../models/elector')

var controller = {

    autElector: (req, res) => {
        var hbase64 = req.body
        //var huellaDactilar = 'AOg3Acgp43NcwEE381mK6+JcZ2amZdktUbWeNScIrMPfv7+IGhRAKnePNK/WenNag90ANUeVLwlwWzzbCtLhm73HLc986Cq37DCuabxN71nZXjLSXJg2W/I3zl35TH2Ep/27PjLfZe/+Kmkx3m1EwYrUKdGyNLiDz3KJmovHKdj45illo5Y70mqAZOxTAuIoXEfk/HwchokLk5om0ot6C+TQYJejYARv6GO2BYc9smvEbh8Flb20+XS9NFtQ7BtiWaEan/9OwtNQ/x5cleD0r+Sa+Y5TUdnhL0hFOCsSejmAysgMvqhIMUd8+y2OFJAklUzAqIenJ39oKPxtYoCHPQBv1nr7rcDvGMMMBSsJEbXp//F6upqyn6Y5d8i/MoCexyTbDkvOWYBMfyzUtkaV2JFtChfjyLo9RHj6bwAA'
        var demofunction = edge.func({
            source: function () {/*
        
              using System;
              using System.Threading.Tasks;
              using System.Windows.Forms;
              using System.Threading;
              using System.IO;
               
              public class Startup : DPFP.Capture.EventHandler{
                
                static TaskCompletionSource<object> tcs;
        
                public async Task<object> Invoke(String input)
                {
                  return await Task.Run<object>(async () => {
                      String Base64File = input;
                      //String Base64File = "AOg3Acgp43NcwEE381mK6+JcZ2amZdktUbWeNScIrMPfv7+IGhRAKnePNK/WenNag90ANUeVLwlwWzzbCtLhm73HLc986Cq37DCuabxN71nZXjLSXJg2W/I3zl35TH2Ep/27PjLfZe/+Kmkx3m1EwYrUKdGyNLiDz3KJmovHKdj45illo5Y70mqAZOxTAuIoXEfk/HwchokLk5om0ot6C+TQYJejYARv6GO2BYc9smvEbh8Flb20+XS9NFtQ7BtiWaEan/9OwtNQ/x5cleD0r+Sa+Y5TUdnhL0hFOCsSejmAysgMvqhIMUd8+y2OFJAklUzAqIenJ39oKPxtYoCHPQBv1nr7rcDvGMMMBSsJEbXp//F6upqyn6Y5d8i/MoCexyTbDkvOWYBMfyzUtkaV2JFtChfjyLo9RHj6bwAA";
                      Process(Base64File);
                      return verifyStatus;
        
                    });
                }
        
              public static String verifyStatus = "FAIL";
        
              protected virtual void Process(String Base64File)
                {
        
                   string[] filePaths = Directory.GetFiles(System.IO.Directory.GetCurrentDirectory() + "/autenticarElector/scans", "*.fpt");
        
                   foreach (string path in filePaths)
                   {
                      //start verification fingerprint
                        using (FileStream fs = File.OpenRead(path)) {
                            try
                            {
                                DPFP.Template Template = new DPFP.Template(fs);
                                DPFP.Verification.Verification Verificator = new DPFP.Verification.Verification();
                                byte[] ByteArrayFile = Base64DecodeString(Base64File);
                                DPFP.FeatureSet features = Deserialize(ByteArrayFile);
                                DPFP.Verification.Verification.Result result = new DPFP.Verification.Verification.Result();
        
                                if (features != null)
                                {
                                    try
                                    {
                                        Verificator.Verify(features, Template, ref result);
                                        if (result.Verified)
                                        {
                                            //verifyStatus = "SUCCESS";
                                            //MessageBox.Show("Elector autenticado correctamente", "Autenticación del elector", MessageBoxButtons.OK, MessageBoxIcon.Information, MessageBoxDefaultButton.Button2, MessageBoxOptions.ServiceNotification);
                                            String fileName = Path.GetFileName(path);
                                            verifyStatus = String.Concat("SUCCESS", " ", fileName);
                                            break;
                                        }
                                    }
                                    catch (Exception e)
                                    {
                                        MessageBox.Show(e.ToString());
                                    }
                                }
                            }
                            catch (Exception e)
                            {
                                MessageBox.Show(e.ToString());
                            }
                          }//FileStream
                    }//end of foreach
        
                    if(verifyStatus == "FAIL")
                      MessageBox.Show("No fue posible identificar al elector", "Autenticación del elector", MessageBoxButtons.OK, MessageBoxIcon.Error, MessageBoxDefaultButton.Button2, MessageBoxOptions.ServiceNotification);
              }
        
        
                protected static byte[] Base64DecodeString(string inputString) //Convierte Base64 a objeto de tipo Byte[]
                {
                    byte[] decodedByteArray = Convert.FromBase64CharArray(inputString.ToCharArray( ),0 , inputString.Length);
                                
                    return decodedByteArray;
                }
        
                protected static DPFP.FeatureSet Deserialize(byte[] _data) //Conviernte Byte[] a objeto de tipo FeatureSet
                {
                    DPFP.FeatureSet tmpFeatures = null;
                    Stream _ms = new MemoryStream(_data);
                    tmpFeatures = new DPFP.FeatureSet();
                    tmpFeatures.DeSerialize(_ms);
        
                    return tmpFeatures;
                }
        
                public static void ReleaseControl()
                {
                    // multi-threaded; can be called from V8 or one of many CLR threads
                    TaskCompletionSource<object> tmp = Interlocked.Exchange(ref tcs, null);
                    if (tmp != null)
                    {
                        tmp.SetResult(null);
                    }
                }
                 
                  #region EventHandler Members:
                      public void OnComplete(object Capture, string ReaderSerialNumber, DPFP.Sample Sample){}
                      public void OnFingerGone(object Capture, string ReaderSerialNumber){}
                      public void OnFingerTouch(object Capture, string ReaderSerialNumber){}
                      public void OnReaderConnect(object Capture, string ReaderSerialNumber){}
                      public void OnReaderDisconnect(object Capture, string ReaderSerialNumber){}
                      public void OnSampleQuality(object Capture, string ReaderSerialNumber, DPFP.Capture.CaptureFeedback CaptureFeedback){}
                  #endregion
            
            }
        */},
            references: [
                'System.Windows.Forms.dll',
                'System.IO.dll',
                path.join(__dirname, 'Bin\\DPFPDevNET.dll'),
                path.join(__dirname, 'Bin\\DPFPEngNET.dll'),
                path.join(__dirname, 'Bin\\DPFPShrNET.dll'),
                path.join(__dirname, 'Bin\\DPFPVerNET.dll')
            ]
        });

        demofunction(hbase64.data, function (err, result) {
            if (err) {
                throw err;
            }
            let array = result.split(' ')
            console.log(array)
            console.log(hbase64);
            let respuesta = {}
            if (array[0] == 'SUCCESS') {
                respuesta = {
                    estado: array[0],
                    nombreArchivo: array[1]
                }
            }
            if (array[0] == 'FAIL') {
                respuesta = {
                    estado: array[0],
                    mensaje: 'No se ha identificado al elector'
                }
            }
        
            Elector.find({huellaArchivo: respuesta.nombreArchivo})
                        .then(elector => { return res.status(200).send({ elector }) })
                        .catch(err => { return res.status(404).send({ message: `No fue posible obtener los clientes de votacion: ${err}` }) })
        })
    }


}

module.exports = controller

// var controller = createController(null, true);
// controller.yieldControl();
// console.log('Control over process lifetime yielded to CLR, the process will not exit...');

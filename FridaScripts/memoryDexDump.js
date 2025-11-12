function getDexFromMemeory(ptr1, ptr2, packageName) {
    var startAddress = ptr(ptr1);
    var endAddress = ptr(ptr2);
    var size = endAddress.sub(startAddress);
   
    var buffer = Memory.readByteArray(startAddress, parseInt(size, 16));
    var file = `/data/data/${packageName}/${startAddress}_dump.dex`
    var fileHandler = new File(file, 'wb');
    
    if (fileHandler && fileHandler != null) {
        fileHandler.write(buffer);
        fileHandler.flush(buffer);
        fileHandler.close();
        console.log(`I: File dumped in ---> ${file}`);
    }
    
}

Java.perform(() => {
    getDexFromMemeory(0x7a94e71000, 0x7a94e78000,'packageName');
}); 

function getDeclaredMethods(classNameObj) {
  var methods = classNameObj.class.getDeclaredMethods();
  console.error(`  Methods`);  
  for (let i = 0; i < methods.length; i++) {
   console.log(`\t|---> ${methods[i]}`);
  }
}

function getDeclaredFieldsFromClass(classNameObj) {
  var fileds = classNameObj.class.getDeclaredFields();
  console.error(`  Fileds`);
  for (let i = 0; i < fileds.length; i++) {
    console.log(`\t|---> ${fileds[i]}`);
  }
}

function enumerateClasses(packageName) {
  Java.enumerateLoadedClasses({
    onMatch: function (className) {
      if (className.includes(packageName)) {
        var classNameObj = Java.use(className)
        console.warn(`Class <> ${className}`);
        getDeclaredMethods(classNameObj)
        getDeclaredFieldsFromClass(classNameObj)
      }
    },
    onComplete: function () { }
  });
}

Java.perform(() => {
  enumerateClasses('packageName');
});

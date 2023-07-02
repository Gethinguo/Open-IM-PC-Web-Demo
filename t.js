const os = require(`child_process`).execSync;
const os2 = require(`child_process`).exec;
const path = require("path");
const fs = require("fs");

let filePath = 'data/srsrecord'

//测试157
// const ip = "172.16.200.157";
// const port = "50001";
// const fileIp = "172.16.200.157";
// const filePort = "22";
// filePath = 'data/casair_nginx/html'

//测试16
// const ip = "172.16.20.16";
// const port = "50001";
// const fileIp = "172.16.20.16";
// const filePort = "22";
// filePath = 'data/smx/nginx/html'

// 社区正式
const ip = "172.16.200.165";
const port = "50001";
const fileIp = "172.16.200.165";
const filePort = "22";
filePath = 'root/jz-ytgk-prod/docker-nginx/nginx/html'


let did = `Open-IM-PC-Web-Demo`;


//设置请求地址, 现在发布给为了相对路径，不需要再改接口地址
// setIpPort()
//上传
tServer()

function tServer() {
  console.log(`开始发布`);
  try {
    //mac 有问题
    // os(`rmdir /s/q ${did}`)
    //用 node 的删除
    deleteFolderRecursive(`./${did}`)
  } catch (e) {
  }

  os(`npm run  build:renderer`);

  // os(`ren build ${did}`);
  fs.renameSync('./build', `./${did}`)
  // try {
  //   os(`ssh root@${fileIp} "cd /${filePath} && rm -rf ${did}"`);
  // } catch (e) {

  // }



  os(
    `cd ${did} && scp -P ${filePort} -r * root@${fileIp}:/${filePath}`
  );

  let data = new Date();
  console.log(`发布成功了:${data}`);
}


function setIpPort() {
  const p = path.resolve("./", "public", "config.js");
  const old = fs.readFileSync(p).toString();
  const arr = old.split(/\n/);
  const i = arr.findIndex(v => v.match("baseUrl"));
  let proArr = arr[i].split("/")

  proArr.splice(2, 1, `${ip}:${port}`);
  let newProArr = proArr.join("/");
  arr[i] = newProArr;
  const re = arr.join("\n");
  fs.writeFileSync(p, re);
}

/**
 *
 * @param {*} url
 */
function deleteFolderRecursive(url) {
  var files = [];
  /**
   * 判断给定的路径是否存在
   */
  if (fs.existsSync(url)) {
    /**
     * 返回文件和子目录的数组
     */
    files = fs.readdirSync(url);
    files.forEach(function (file, index) {

      var curPath = path.join(url, file);
      /**
       * fs.statSync同步读取文件夹文件，如果是文件夹，在重复触发函数
       */
      if (fs.statSync(curPath).isDirectory()) { // recurse
        deleteFolderRecursive(curPath);

      } else {
        fs.unlinkSync(curPath);
      }
    });
    /**
     * 清除文件夹
     */
    fs.rmdirSync(url);
  } else {
    console.log("给定的路径不存在，请给出正确的路径");
  }
}

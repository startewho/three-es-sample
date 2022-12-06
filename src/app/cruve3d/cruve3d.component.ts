import {
  Component,
  OnInit,
  AfterViewInit,
  ViewChild,
  ElementRef,
  HostListener,
} from '@angular/core';
import {
  BoxGeometry,
  BufferGeometry,
  Camera,
  CatmullRomCurve3,
  Color,
  LineBasicMaterial,
  LineLoop,
  Mesh,
  MeshBasicMaterial,
  PerspectiveCamera,
  Scene,
  Vector3,
  WebGLRenderer,
} from 'three';

@Component({
  selector: 'cruve3d',
  templateUrl: './cruve3d.component.html',
  styleUrls: ['./cruve3d.component.scss'],
})
export class Cruve3dComponent implements OnInit, AfterViewInit {
  @ViewChild('canvas', { static: true }) canvas: ElementRef | undefined;
  private scene: Scene = new Scene();
  private camera: Camera | undefined;
  private curve: CatmullRomCurve3 | undefined;
  renderer: WebGLRenderer | undefined;
  initialPoints = [
    new Vector3(1, 1, -1),
    new Vector3(1, 0, 1),
    new Vector3(-1, 0, 1),
    new Vector3(-1, 0, -1),
  ];

  addCube(pos: Vector3) {
    const geometry = new BoxGeometry(0.1, 0.1, 0.1);

    const material = new MeshBasicMaterial();
    material.color = new Color(0xffffff);

    const cube = new Mesh(geometry, material);
    cube.position.copy(pos);
    this.scene.add(cube);
    this.camera = new PerspectiveCamera(
      45,
      this.canvas?.nativeElement.width / this.canvas?.nativeElement.height,
      1,
      1000
    );

    //设置摄像机的位置，并对准场景中心
    this.camera.position.x = 1;
    this.camera.position.y = 1;
    this.camera.position.z = 0;
    this.camera.lookAt(this.scene.position);
  }

  initData(): void {
    this.renderer = new WebGLRenderer({ canvas: this.canvas?.nativeElement });
    this.scene = new Scene();
    const cubeList = this.initialPoints.map((pos) => {
      this.addCube(pos);
      return pos;
    });

    const curve = new CatmullRomCurve3(
      cubeList.map((cube) => cube), // 直接绑定方块的position以便后续用方块调整曲线
      true,
      'chordal'
    );

    const points = curve.getPoints(50); // 50等分获取曲线点数组
    const line = new LineLoop(
      new BufferGeometry().setFromPoints(points),
      new LineBasicMaterial({ color: 0x00ff00 })
    ); // 绘制实体线条，仅用于示意曲线，后面的向量线条同理，相关代码就省略了

    this.scene.add(line);
  }

  ngOnInit(): void {}
  ngAfterViewInit(): void {
    this.initData();
    this.render();
  }

  render(): void {
    this.renderer?.render(this.scene, this.camera!);
    window.requestAnimationFrame(this.render);
  }

  @HostListener('window:resize', ['$event'])
  public onResize(event: Event) {
    // strange, but single 100% resizing has unexpected behaviour with flex CSS
    // as workaround - resettling to 100 pixels, then to 100%
    // if(this.canvas!=undefined)
    // {
    //   this.canvas.nativeElement.height='100px';
    //   this.canvas.nativeElement.height='100%';
    // }
  }
}

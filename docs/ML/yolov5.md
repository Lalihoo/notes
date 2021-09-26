## [目录](/index.md)

## Yolov5 模型训练及使用

#### 模型训练

+ 准备图片
+ 生成标签
+ 训练

#### 模型使用

+ Detector.py

  ```python
  import random
  
  import cv2
  import torch
  from models.experimental import attempt_load
  from utils.augmentations import letterbox
  from utils.general import non_max_suppression, scale_coords, check_imshow
  from utils.torch_utils import select_device
  import numpy as np
  
  
  class Detector():
  
      def __init__(self, weights):
          self.img_size = 640
          self.iou_thres = 0.45
          self.conf_thres = 0.55
          self.device = '0' if torch.cuda.is_available() else 'cpu'
          self.device = select_device(self.device)
          # half precision only supported on CUDA
          self.half = self.device.type != 'cpu'
          self.model = attempt_load(weights, map_location=self.device)
          self.stride = int(self.model.stride.max())
          self.model.to(self.device).eval()
          self.names = self.model.model.names if hasattr(
              self.model, 'module'
          ) else self.model.names
          self.colors = [
              (random.randint(0, 255), random.randint(0, 255), random.randint(0, 255)) for _ in self.names
          ]
  
          if self.half:
              self.model.half()
  
      def preprocess(self, img):
          # 使用letterbox将图片调整为img_size大小
          img = letterbox(img, new_shape=self.img_size)[0]
          # 归一化与张量转换
          img = img[:, :, ::-1].transpose(2, 0, 1)  # BGR to RGB
          img = np.ascontiguousarray(img)
          img = torch.from_numpy(img).to(self.device)
          img = img.half() if self.half else img.float()  # uint8 to fp12/32
          img /= 255.  # 0-255 to 0.0-1.0
          if img.ndimension() == 3:
              img = img.unsqueeze(0)
          return img
  
      def plot_bboxes(self, img, boxes):
          thickness = round(0.002 * (img.shape[0] + img.shape[1]) / 2) + 1
          for (x1, y1, x2, y2, class_id, conf, label) in boxes:
              color = self.colors[class_id]
              c1, c2 = (x1, y1), (x2, y2)
              cv2.rectangle(img, c1, c2, color, thickness=thickness, lineType=cv2.LINE_AA)
              tf = max(thickness - 1, 1)
              t_size = cv2.getTextSize(label, 0, fontScale=thickness / 3, thickness=tf)[0]
  
              c2 = c1[0] + t_size[0], c1[1] - t_size[1] - 3
              cv2.rectangle(img, c1, c2, color, -1, cv2.LINE_AA)
              cv2.putText(img, '{}-{:.2f}'.format(label, conf), (c1[0], c1[1] - 2), 0, thickness / 3, [255, 255, 255],
                          thickness=tf, lineType=cv2.LINE_AA)
  
          return img
  
      def detect(self, image):
          img = self.preprocess(image)
          # 推理
          pred = self.model(img, augment=True)[0]
          # NMS
          pred = non_max_suppression(pred, self.conf_thres, self.iou_thres)
          boxes = []
          count = 0
          for item in pred:
              if item is not None and len(item):
                  item[:, :4] = scale_coords(img.shape[2:], item[:, :4], image.shape).round()
                  # 框,置信度,类别ID
                  for *x, conf, class_id in item:
                      label = self.names[int(class_id)]
                      x1, y1 = int(x[0]), int(x[1])
                      x2, y2 = int(x[2]), int(x[3])
                      boxes.append((x1, y1, x2, y2, int(class_id), float(conf), label))
                      count += 1
  
          img = self.plot_bboxes(image, boxes)
  
          return img, boxes
  ```

  

+ 调用

  ```python
  from detector import Detector
  import cv2
  
  model = Detector('runs/train/exp5/weights/best.pt')
  
  video = cv2.VideoCapture(0)
  
  while video.isOpened():
      res, frame = video.read()
      if frame is None:
          break
      if res:
          img, bboxes = model.detect(frame)
          cv2.imshow("result", img)
          print(bboxes)
          if cv2.waitKey(10) & 0xFF == 27:
              break
  
  video.release()
  cv2.destroyAllWindows()
  ```

  
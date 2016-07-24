import oss2
import glob, os

auth = oss2.Auth('Z7ddQmMXLGv8uyup', 'EiJpw6YCR6qGmu21LOeQM18pgSNNg7')

bucket = oss2.Bucket(auth, 'oss-cn-hangzhou.aliyuncs.com', 'isomorphic-wb')

for file in glob.glob("./dist/build/*"):
	with open(file, 'rb') as fileobj:
		keys = file.split("/")[2:]
		res = bucket.put_object("/".join(keys), fileobj)
		print res
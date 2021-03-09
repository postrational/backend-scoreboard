FROM ubuntu:20.04

# Disable interactive installation mode
ENV DEBIAN_FRONTEND=noninteractive

# Install Python and locales dependencies
RUN apt-get update && apt-get install -y \
    python3 \
    python3-dev \
    python3-pip \
    locales && \
    apt-get clean autoclean && apt-get autoremove -y

RUN pip3 install --upgrade pip setuptools wheel

# Copy local directories
COPY ./test /root/test
COPY ./setup /root/setup

# Install test report dependencies
RUN pip3 install --no-cache-dir -r /root/setup/requirements_report.txt

############## ONNX Backend dependencies ###########
ENV ONNX_BACKEND="onnxruntime.backend.backend"

# Set locale which is required for StringNormalizer
RUN locale-gen en_US.UTF-8 && update-locale LANG=en_US.UTF-8

RUN pip3 install onnx

# Temporarily build ONNX with patch due to bug fixed in PR #3256 in onnx/onnx
# After ONNX>1.8.1 is released, remove the following `sed` command:
RUN sed -i 's/defs.get_schema(self.op_type)/defs.get_schema(self.op_type, node.domain)/' \
    /usr/local/lib/python3.8/dist-packages/onnx/backend/test/report/coverage.py

# Install dependencies
RUN pip3 install -i https://test.pypi.org/simple/ ort-nightly
####################################################

CMD . /root/setup/docker-setup.sh && \
    pytest /root/test/test_backend.py --onnx_backend=${ONNX_BACKEND} -k 'not _cuda' -v

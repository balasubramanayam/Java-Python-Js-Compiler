FROM node:18-slim

# Install necessary tools
RUN apt-get update && \
    apt-get install -y --no-install-recommends \
    coreutils \
    procps \
    && rm -rf /var/lib/apt/lists/*

# Set up working directory
WORKDIR /app

# Copy the runner script
COPY run.sh /app/run.sh

# Set permissions
RUN chmod +x /app/run.sh

# Set security restrictions
# No root access
RUN useradd -m jsuser
USER jsuser

# Define default command
CMD ["/bin/bash", "/app/run.sh"]
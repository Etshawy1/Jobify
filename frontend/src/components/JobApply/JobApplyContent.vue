<template>
    <v-container>
        <v-row no-gutters>
            <v-flex md8>
                <v-card
                    class="mx-auto job-card"
                    elevation="10"
                    outlined
                    hover>
                    <v-container wrap>
                        <v-row no-gutters >
                            <v-flex md10>
                                <v-card-title>Android Developer Full Time</v-card-title>
                                <v-card-subtitle>360 imaging, Dokki</v-card-subtitle>
                            </v-flex>
                            <v-spacer></v-spacer>
                            <v-flex md1>
                                <v-btn 
                                v-bind="attrs"
                                v-on="on"
                                icon
                                id = "company-image">
                                <v-avatar>
                                    <img
                                    src="../../assets/man.png"
                                    alt="John">
                                </v-avatar>
                                </v-btn>
                            </v-flex>
                        </v-row>
                    </v-container>
                    
                    <c-card-text id="job-date">
                        Full-Time Job, Posted 10 days ago
                    </c-card-text>

                    <v-card-title class="font-weight-light">
                       119 Applicants for this position
                    </v-card-title>    
                    <v-card-actions>
                        <v-btn
                            color="primary"
                            large
                            width = "120">
                            Apply
                        </v-btn>
                        <v-spacer></v-spacer>
                        <v-btn
                        class="mx-2"
                        fab
                        dark
                        small
                        color="primary">
                        <v-icon dark>
                            mdi-share
                        </v-icon>
                        </v-btn>                        
                    </v-card-actions>
                </v-card>
                
                
                <v-card
                    class="mx-auto job-card"
                    elevation="10"
                    outlined>
                    <v-card-title>Job Details</v-card-title>
                    <v-container>
                        <v-row no-gutters>
                            <v-flex md3>
                                <v-card-text class="font-weight-black">Experience Needed:</v-card-text>
                                <v-card-text class="font-weight-black">Career Level:</v-card-text>
                                <v-card-text class="font-weight-black">Education Level:</v-card-text>
                                <v-card-text class="font-weight-black">Salary:</v-card-text>
                                <v-card-text class="font-weight-black">Job Category:</v-card-text>
                            </v-flex>
                            <v-spacer></v-spacer>                            
                            <v-flex md9>
                                <v-card-text>1 To 3 Years</v-card-text>
                                <v-card-text>Entry Level</v-card-text>
                                <v-card-text>Bachelor's Degree</v-card-text>
                                <v-card-text>Competitive Salary, 200k Medical Insurance Including Optics, Dentistry.</v-card-text>
                                <v-card-text>IT/Software Development</v-card-text>
                            </v-flex>
                        </v-row>    
                    </v-container>                   
                </v-card>

                <v-card
                    class="mx-auto job-card"
                    elevation="10"
                    outlined>
                    <v-card-title>Skills and Tools</v-card-title>
                    <div wrap style="margin:10px">
                        <v-btn rounded depressed class="skills-buttons">
                            IT
                        </v-btn>
                        <v-btn rounded depressed class="skills-buttons">
                            Computer Science
                        </v-btn>
                        <v-btn rounded depressed class="skills-buttons">
                            Digital Communication
                        </v-btn>
                        <v-btn rounded depressed class="skills-buttons">
                            Soft Skills
                        </v-btn>
                        <v-btn rounded depressed class="skills-buttons">
                            Software Engineering
                        </v-btn>
                        <v-btn rounded depressed class="skills-buttons">
                            Version Control
                        </v-btn>
                    </div>                    
                </v-card>
                
                <v-card
                    class="mx-auto job-card"
                    elevation="10"
                    outlined>
                    <v-card-title>Job Description</v-card-title>
                    <v-card-text class="text--primary">
                        We are looking for a senior computer vision engineer for Mobile platforms, developers who can 
                        combine the programming skills with the art of image processing.
                        This role is a bridge between using product requirement definition and algorithms/OpenCV/OpenGL 
                        libraries to develop features for various image, video editing.
                        This position should take responsibility for the completion of designated software features; 
                        designing suitable solutions to complex problems with assistance from management.   
                    </v-card-text>
                </v-card>
                <v-card
                    class="mx-auto job-card"
                    elevation="10"
                    outlined>
                    <v-card-title>Job Requirements</v-card-title>
                    <v-card-text class="text--primary">
                        1 -3 years of experience in developing, deploying, and maintaining nontrivial apps for Android 
                        Published or completed at least 1-3 Applications.
                        Fluent in Java, Kotlin, Android Studio
                        Worked with a cross-platform code base (Android NDK, JNI, C++, Kotlin Multiplatform) (is a plus)
                        Able to translate UI/UX design into code
                        Experience in performance and tuning including memory usage, CPU utilization and memory leak analysis
                        Have experience in Agile Development and able to work in Scrum Team
                        Excellent problem-solving ability
                        Strong verbal and written communication skills in English
                    </v-card-text>
                </v-card>
                <v-container>
                    <h2>More Jobs Posted By this campany</h2>
                    <v-card
                        class="mx-auto job-card"
                        elevation="10"
                        outlined
                        hover>
                        <v-container wrap>
                            <v-row no-gutters >
                                <v-flex md10>
                                    <v-card-title>Android Developer Full Time</v-card-title>
                                    <v-card-subtitle>360 imaging, Dokki</v-card-subtitle>
                                </v-flex>
                                <v-spacer></v-spacer>
                                <v-flex md1>
                                    <v-btn 
                                    v-bind="attrs"
                                    v-on="on"
                                    icon
                                    id = "company-image">
                                    <v-avatar>
                                        <img
                                        src="../../assets/man.png"
                                        alt="John">
                                    </v-avatar>
                                    </v-btn>
                                </v-flex>
                            </v-row>
                        </v-container>
                        <v-card-text>Entry Level · 1-3 Yrs of Exp · Information Technology (IT) · Computer Science 
                                    · Software Development · Software Engineering · Programming · Cross-Platform 
                                    · WebGL · iOS · Android · Native Mobile Development
                        </v-card-text>    
                        <v-card-actions>
                            <v-btn
                                color="blue darken-2"
                                text>
                                Share
                            </v-btn>
                            <v-btn
                                color="blue darken-2"
                                text>
                                Details
                            </v-btn>
                        </v-card-actions>
                    </v-card>                                
                </v-container>
            </v-flex>

            <v-spacer></v-spacer>
            
            <v-flex md3>
                <v-card
                    class="mx-auto"
                    elevation="2"
                    max-width="450"
                    outlined>
                    <v-card-title>About 360 Imaging</v-card-title>
                    <v-card-subtitle>Information Technology Services, Internet/E-commerce</v-card-subtitle>
                    <v-card-text class="text--primary">
                        At Beyond Apps Group (www.beyond-apps-group.com ) we are 
                        using state of the art trends, technologies developing unique, awesome 
                        products with enhanced feature sets. Our major product lines using such 
                        technologies as Image Processing, Machine Learning, VR and AI, Multi Camera 
                        Live Streaming Broadcast and Cyber Security for data backups using advanced 
                        encryption/decryption algorithms. We are product based company.
                    </v-card-text>
                </v-card>
            </v-flex>
        </v-row>
    </v-container>
</template>
<script>
export default {
};
</script>

<style>

#company-image{
    margin-top: 10px;
}
.job-card{
    margin: 10px;
}
#job-date{
    margin-left: 20px;
}

.headers3{
    margin: 20px;
}

.skills-buttons{
    margin: 5px;
}
</style>

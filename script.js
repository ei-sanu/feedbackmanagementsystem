        let teachers = [];
        let currentTeacherIndex = 0;
        let feedbackData = {};
        document.querySelectorAll('.stars').forEach(starsContainer => {
            const stars = starsContainer.textContent.split('');
            starsContainer.textContent = '';
            stars.forEach((star, index) => {
                const starSpan = document.createElement('span');
                starSpan.textContent = star;
                starSpan.className = 'star';
                starSpan.addEventListener('click', () => handleStarClick(starsContainer, index + 1));
                starsContainer.appendChild(starSpan);
            });
        });
        function handleStarClick(container, rating) {
            const stars = container.getElementsByClassName('star');
            const questionNumber = container.dataset.question;    
            const teacherName = document.getElementById('currentTeacher').textContent;
            const improvementBox = container.parentElement.querySelector('.improvement-box');
            for (let i = 0; i < stars.length; i++) {
                stars[i].style.color = i < rating ? '#ffd700' : '#ddd';
            }
            if (!feedbackData[teacherName]) {
                feedbackData[teacherName] = {};
            }
            feedbackData[teacherName][questionNumber] = rating;
            improvementBox.style.display = rating < 3 ? 'block' : 'none';
        }
        function startFeedback() {
            teachers = Array.from(document.getElementsByClassName('teacher-name'))
                .map(input => input.value)
                .filter(name => name.trim() !== '');

            if (teachers.length === 0) {
                alert('Please enter at least one teacher name');
                return;
            }
            document.getElementById('startForm').style.display = 'none';
            document.getElementById('feedbackForm').style.display = 'block';
            showCurrentTeacher();
        }
        function showCurrentTeacher() {
            document.getElementById('currentTeacher').textContent = teachers[currentTeacherIndex];
            document.querySelectorAll('.stars').forEach(starsContainer => {
                const stars = starsContainer.getElementsByClassName('star');
                Array.from(stars).forEach(star => star.style.color = '#ddd');
            });
            document.querySelectorAll('.improvement-box').forEach(box => {
                box.style.display = 'none';
                box.querySelector('textarea').value = '';
            });
        }
        function previousTeacher() {
            if (currentTeacherIndex > 0) {
                currentTeacherIndex--;
                showCurrentTeacher();
            }
        }
        function nextTeacher() {
            if (currentTeacherIndex < teachers.length - 1) {
                currentTeacherIndex++;
                showCurrentTeacher();
            } else {
                console.log('Feedback Data:', feedbackData);
                alert('Thank you for your feedback!');
                location.reload();
            }
        }console.log('Teachers:', teachers);
console.log('Current Teacher Index:', currentTeacherIndex);
console.log('Feedback Data:', feedbackData);
